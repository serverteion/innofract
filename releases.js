/**
 * innofract - Release Data
 * 3 releases for the netlabel
 */

const RELEASES = [
  {
    id: 1,
    title: "innofract celebration : 001",
    artist: "Various Artists",
    date: "2026-02-27",
    artworkImage: "https://raw.githubusercontent.com/serverteion/innopics/refs/heads/main/musicpis/inno0001.png",
    catalog: "inno-0001",
    downloadUrl: "https://innofract.bandcamp.com/album/innofract-celebration-001"
  },
  {
    id: 2,
    title: "Klimt EP",
    artist: "Triplett",
    date: "2026-04-26",
    artworkImage: "https://raw.githubusercontent.com/serverteion/innopics/refs/heads/main/musicpis/inno0002.png",
    catalog: "inno-0002",
    downloadUrl: "https://innofract.bandcamp.com/album/klimt-ep"
  },
  {
    id: 3,
    title: "REDUCTED",
    artist: "Various Artists",
    date: "2026-04-26",
    artworkImage: "https://raw.githubusercontent.com/serverteion/innopics/refs/heads/main/musicpis/inno0003.png",
    catalog: "inno-0003",
    downloadUrl: "https://innofract.bandcamp.com/album/reducted"
  }
];

// Sort by date ascending (oldest first)
RELEASES.sort((a, b) => a.date.localeCompare(b.date));

/**
 * Generates a deterministic SVG placeholder artwork based on seed string
 * Uses pseudo-random values derived from the seed for consistent unique artworks
 */
function generateArtworkSVG(seed, size = 400) {
  // Simple hash function for deterministic pseudo-randomness
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
  const baseLightness = 75 + seededRandom(20); // 75-95% lightness
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
  const shapeCount = 5 + Math.floor(seededRandom(6)); // 5-10 shapes
  
  for (let i = 0; i < shapeCount; i++) {
    const type = Math.floor(seededRandom(3)); // circles, rects, triangles only
    const x = seededRandom(size);
    const y = seededRandom(size);
    const r = 15 + seededRandom(60); // smaller shapes
    const color = colors[Math.floor(seededRandom(colors.length))];
    const opacity = 0.08 + seededRandom(0.15); // very subtle
    const rotation = seededRandom(360);
    
    shapes.push({ type, x, y, r, color, opacity, rotation });
  }
  
  // Build SVG
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="#7a7a7a"/>`; // match bg
  
  // Background subtle gradient
  svg += `<defs><linearGradient id="bg-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">`;
  svg += `<stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.1"/>`;
  svg += `<stop offset="100%" stop-color="${colors[1]}" stop-opacity="0.05"/>`;
  svg += `</linearGradient></defs>`;
  svg += `<rect width="${size}" height="${size}" fill="url(#bg-${seed})"/>`;
  
  // Shapes - simple, clean, monochrome
  shapes.forEach((shape, i) => {
    const delay = (i * 0.1).toFixed(1);
    const dur = (4 + seededRandom(3)).toFixed(1);
    
    switch (shape.type) {
      case 0: // Circle
        svg += `<circle cx="${shape.x}" cy="${shape.y}" r="${shape.r}" fill="${shape.color}" opacity="${shape.opacity}">`;
        svg += `<animate attributeName="r" values="${shape.r};${shape.r * 1.15};${shape.r}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `<animate attributeName="opacity" values="${shape.opacity};${shape.opacity * 0.6};${shape.opacity}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `</circle>`;
        break;
      case 1: // Rectangle
        svg += `<rect x="${shape.x - shape.r/2}" y="${shape.y - shape.r/2}" width="${shape.r}" height="${shape.r}" fill="${shape.color}" opacity="${shape.opacity}" transform="rotate(${shape.rotation} ${shape.x} ${shape.y})">`;
        svg += `<animate attributeName="opacity" values="${shape.opacity};${shape.opacity * 0.5};${shape.opacity}" dur="${dur}s" repeatCount="indefinite" begin="${delay}s"/>`;
        svg += `</rect>`;
        break;
      case 2: // Triangle
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

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RELEASES, generateArtworkSVG };
}