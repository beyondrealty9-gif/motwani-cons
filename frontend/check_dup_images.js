const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts') || name.endsWith('.jsx') || name.endsWith('.js')) {
      files.push(name);
    }
  }
  return files;
}

const srcDir = path.join(__dirname, 'src');
const files = getFiles(srcDir);
const imgMap = {};

const imgRegex = /(https:\/\/images\.unsplash\.com\/[^\s"'`]+|\/[^\s"'`]+\.(jpg|jpeg|png|webp))/g;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const url = match[1];
    const idMatch = url.match(/photo-([0-9a-f\-]+)/);
    const key = idMatch ? idMatch[0] : url;
    if (!imgMap[key]) imgMap[key] = [];
    imgMap[key].push({ file: path.relative(srcDir, f), url });
  }
});

const duplicates = {};
for (const key in imgMap) {
  if (imgMap[key].length > 1) {
    // Ignore logotype or header/footer logo
    if (key.includes('logo')) continue;
    duplicates[key] = imgMap[key];
  }
}

console.log(JSON.stringify(duplicates, null, 2));
