/**
 * innofract - Shared JavaScript
 * Handles header injection and release rendering
 */

// ============================================================
// Shared Header HTML (injected into music.html & about.html)
// ============================================================
const HEADER_HTML = `
<header class="site-header" role="banner">
  <a href="enter.html" class="site-header-logo" aria-label="innofract - Enter">
    <img src="images/innofract_logo_001_white.png" alt="innofract">
  </a>
  <nav aria-label="Main navigation">
    <a href="index.html">HOME</a>
    <a href="music.html">MUSIC</a>
    <a href="blog.html">BLOG</a>
    <a href="member.html">MEMBER</a>
    <a href="about.html">ABOUT</a>
  </nav>
  <div class="site-header-social" aria-label="Social links">
    <a href="https://x.com/innofract" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
      <img src="images/X.png" alt="" width="24" height="24" loading="lazy">
    </a>
    <a href="https://www.youtube.com/@innofract" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
      <img src="images/youtube.png" alt="" width="24" height="24" loading="lazy">
    </a>
    <a href="https://innofract.bandcamp.com" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Bandcamp">
      <img src="images/bandcamp.png" alt="" width="24" height="24" loading="lazy">
    </a>
  </div>
</header>
`;

/**
 * Injects the shared header into the page
 * Call this on pages that need the header (music.html, about.html)
 */
function injectHeader(currentPage = '') {
  const headerPlaceholder = document.getElementById('site-header');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = HEADER_HTML;
    // Remove aria-current from all links first
    headerPlaceholder.querySelectorAll('nav a').forEach(a => a.removeAttribute('aria-current'));
    // Update aria-current for active page
    const activeLink = headerPlaceholder.querySelector(`a[href="${currentPage}"]`);
    if (activeLink) {
      activeLink.setAttribute('aria-current', 'page');
    }
  }
}

// ============================================================
// Release Rendering (for music.html)
// ============================================================
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${year}.${month}.${day}`;
}

function createReleaseCard(release, badge = null) {
  const card = document.createElement('article');
  card.className = 'release-card';
  card.setAttribute('data-release-id', release.id);
  
  const artwork = release.artworkImage 
    ? `<img src="${release.artworkImage}" alt="${escapeHtml(release.title)} by ${escapeHtml(release.artist)}" loading="lazy">`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" fill="#7a7a7a"/></svg>`;
  
  const badgeHtml = badge 
    ? `<span class="release-badge">${escapeHtml(badge)}</span>`
    : '';

  const linkUrl = release.downloadUrl || '#';
  const linkTarget = release.downloadUrl ? ' target="_blank" rel="noopener"' : '';

  card.innerHTML = `
    <a href="${linkUrl}" class="release-link"${linkTarget} aria-label="View ${escapeHtml(release.title)} on Bandcamp">
      <div class="release-artwork" role="img" aria-label="${escapeHtml(release.title)} by ${escapeHtml(release.artist)} artwork">
        ${artwork}
        ${badgeHtml}
      </div>
    </a>
    <div class="release-info">
      <h2 class="release-title">${escapeHtml(release.title)}</h2>
      <p class="release-artist">${escapeHtml(release.artist)}</p>
      ${release.catalog ? `<span class="release-catalog">${escapeHtml(release.catalog)}</span>` : ''}
      <time class="release-date" datetime="${release.date}">${formatDate(release.date)}</time>
    </div>
  `;
  
  return card;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function renderReleases() {
  const grid = document.getElementById('releases-grid');
  if (!grid || typeof RELEASES === 'undefined') return;
  
  // Show loading state
  grid.innerHTML = '<div class="loading" style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--fg-muted);">Loading releases...</div>';
  
  // Small delay to show loading (remove in production)
  await new Promise(r => setTimeout(r, 100));
  
  grid.innerHTML = '';
  
  RELEASES.forEach(release => {
    const card = createReleaseCard(release);
    grid.appendChild(card);
  });
}

// ============================================================
// Initialize on DOM ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Inject header if placeholder exists
  const headerPlaceholder = document.getElementById('site-header');
  if (headerPlaceholder) {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    injectHeader(file);
  }
  
  // Render releases if on releases page
  if (document.getElementById('releases-grid')) {
    renderReleases();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ============================================================
// Artwork Generation (copied from releases.js for browser use)
// ============================================================
function generateArtworkSVG(seed, size = 400) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  
  const seededRandom = (max = 1) => {
    hash = (hash * 16807) % 2147483647;
    return (hash / 2147483647) * max;
  };
  
  // Generate white-ish monochrome palette from seed
  const baseLightness = 75 + seededRandom(20);
  const shade1 = baseLightness;
  const shade2 = Math.min(95, baseLightness + seededRandom(10));
  const shade3 = Math.min(98, baseLightness + seededRandom(15));
  const shade4 = Math.max(70, baseLightness - seededRandom(15));
  
  const colors = [
    `hsl(0, 0%, ${shade1}%)`,
    `hsl(0, 0%, ${shade2}%)`,
    `hsl(0, 0%, ${shade3}%)`,
    `hsl(0, 0%, ${shade4}%)`,
    `hsl(0, 0%, ${Math.min(95, baseLightness + seededRandom(10))}%)`
  ];
  
  // Generate shapes - fewer, more subtle, white-ish
  const shapes = [];
  const shapeCount = 5 + Math.floor(seededRandom(6));
  
  for (let i = 0; i < shapeCount; i++) {
    const type = Math.floor(seededRandom(3));
    const x = seededRandom(size);
    const y = seededRandom(size);
    const r = 15 + seededRandom(60);
    const color = colors[Math.floor(seededRandom(colors.length))];
    const opacity = 0.08 + seededRandom(0.15);
    const rotation = seededRandom(360);
    
    shapes.push({ type, x, y, r, color, opacity, rotation });
  }
  
  // Build SVG
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="#7a7a7a"/>`;
  
  svg += `<defs><linearGradient id="bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">`;
  svg += `<stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.1"/>`;
  svg += `<stop offset="100%" stop-color="${colors[1]}" stop-opacity="0.05"/>`;
  svg += `</linearGradient></defs>`;
  svg += `<rect width="${size}" height="${size}" fill="url(#bg-${seed})"/>`;
  
  shapes.forEach((shape, i) => {
    const delay = (i * 0.1).toFixed(1);
    const dur = (4 + seededRandom(3)).toFixed(1);
    
    switch (shape.type) {
      case 0:
        svg += `<circle cx="${shape.x}" cy="${shape.y}" r="${shape.r}" fill="${shape.color}" opacity="${shape.opacity}">`;
        svg += `<animate attributeName="r" values="${shape.r};${shape.r * 1.15};${shape.r}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `<animate attributeName="opacity" values="${shape.opacity};${shape.opacity * 0.6};${shape.opacity}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `</circle>`;
        break;
      case 1:
        svg += `<rect x="${shape.x - shape.r/2}" y="${shape.y - shape.r/2}" width="${shape.r}" height="${shape.r}" fill="${shape.color}" opacity="${shape.opacity}" transform="rotate(${shape.rotation} ${shape.x} ${shape.y})">`;
        svg += `<animate attributeName="opacity" values="${shape.opacity};${shape.opacity * 0.5};${shape.opacity}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `</rect>`;
        break;
      case 2:
        const h = shape.r * 1.732 / 2;
        svg += `<polygon points="${shape.x},${shape.y - h/1.5} ${shape.x - shape.r/2},${shape.y + h/3} ${shape.x + shape.r/2},${shape.y + h/3}" fill="${shape.color}" opacity="${shape.opacity}" transform="rotate(${shape.rotation} ${shape.x} ${shape.y})">`;
        svg += `<animate attributeName="opacity" values="${shape.opacity};${shape.opacity * 0.4};${shape.opacity}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `</polygon>`;
        break;
    }
  });
  
  svg += `</svg>`;
  return svg;
}

// Make available globally for inline use if needed
window.generateArtworkSVG = generateArtworkSVG;