const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../public/images");
const outFile = path.resolve(__dirname, "../public/api/images.json");

// gather image URLs
const files = fs
	.readdirSync(srcDir)
	.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
	.map((f) => `/images/${f}`);

// ensure output folder exists
fs.mkdirSync(path.dirname(outFile), { recursive: true });

// write manifest
fs.writeFileSync(outFile, JSON.stringify(files, null, 2));
