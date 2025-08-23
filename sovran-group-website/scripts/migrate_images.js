/*
Script: scripts/migrate_images.js
- Finds image references in src/**/*.tsx for png/jpg/jpeg/gif/webp
- Copies referenced images from public/ (public/images or public/assets/images) into src/assets/images (preserving subpaths)
- Rewrites references in .tsx files:
  - src="/assets/images/.."  -> src={require('./relative/path/to/src/assets/images/...')}
  - backgroundImage: "url('/assets/images/...')" -> backgroundImage: `url(${require('./relative/path')})`

Run: node scripts/migrate_images.js
*/

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(projectRoot, 'src');
const publicRoot = path.join(projectRoot, 'public');
const destRoot = path.join(srcRoot, 'assets', 'images');

const exts = ['png','jpg','jpeg','gif','webp','svg'];
const extRegex = exts.join('|');
const imgRegex = new RegExp("(\\/(?:assets\\/images|images)\\/[^\\"'`\\)\\s>]+\\.(?:"+extRegex+"))(?:[?][^\\"'`\\)\s>]*)?","ig");

function walk(dir, list=[]) {
  for (const name of fs.readdirSync(dir)){
    const p = path.join(dir,name);
    if (fs.statSync(p).isDirectory()) walk(p,list);
    else if (/\.tsx$/i.test(p)) list.push(p);
  }
  return list;
}

if (!fs.existsSync(srcRoot)) {
  console.error('src/ not found at', srcRoot);
  process.exit(1);
}

const files = walk(srcRoot);
console.log('Found', files.length, '.tsx files to scan');

const referenced = new Map(); // map subpathAfterImages -> Set of source files

for (const file of files) {
  const content = fs.readFileSync(file,'utf8');
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    const full = m[1]; // starts with /assets/images/... or /images/...
    // normalize to subpath after 'images/'
    const idx = full.toLowerCase().indexOf('/images/');
    if (idx === -1) continue;
    const sub = full.slice(idx + '/images/'.length).split('?')[0];
    if (!referenced.has(sub)) referenced.set(sub, new Set());
    referenced.get(sub).add(file);
  }
}

console.log('Found', referenced.size, 'unique referenced image paths (by filename/subpath)');
if (referenced.size===0) process.exit(0);

// Ensure destination
fs.mkdirSync(destRoot, { recursive: true });

const copied = [];
const missing = [];

for (const [sub, filesSet] of referenced.entries()){
  // possible source locations in public
  const candidates = [
    path.join(publicRoot, 'images', sub),
    path.join(publicRoot, 'assets', 'images', sub),
  ];
  let found = null;
  for (const c of candidates){ if (fs.existsSync(c) && fs.statSync(c).isFile()){ found = c; break; } }
  if (!found){ missing.push(sub); continue; }
  // copy to dest preserving subdirs
  const dest = path.join(destRoot, sub);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)){
    fs.copyFileSync(found, dest);
    copied.push(sub);
  }
}

console.log('Copied', copied.length, 'files; Missing', missing.length);
if (copied.length>0) console.log('Copied sample:', copied.slice(0,10));
if (missing.length>0) console.log('Missing sample:', missing.slice(0,10));

// Now update source files: replace occurrences
let filesUpdated = 0;
for (const file of files){
  let content = fs.readFileSync(file,'utf8');
  let updated = content;
  // replace src="/assets/images/..." or src='/assets/images/...'
  updated = updated.replace(/(src=)(["'])(\/(?:assets\/images|images)\/([^"'`\)\s>]+?\.(?:"+extRegex+"))(?:\?[^"']*)?)(["'])/ig, function(_, attr, q1, fullPath, subpath, q2){
    // compute relative path from file to src/assets/images/subpath
    const destFile = path.join('src','assets','images', subpath);
    let rel = path.relative(path.dirname(file), path.join(projectRoot, destFile)).split(path.sep).join('/');
    if (!rel.startsWith('.')) rel = './'+rel;
    return `${attr}{require('${rel}')}`;
  });

  // replace backgroundImage: "url('/assets/images/...')" or url("...") or url(/...)
  updated = updated.replace(/url\(\s*(["']?)(\/(?:assets\/images|images)\/([^"'`\)\s>]+?\.(?:"+extRegex+"))(?:\?[^"')\s]*)?)\1\s*\)/ig, function(_, q, fullPath, subpath){
    const destFile = path.join('src','assets','images', subpath);
    let rel = path.relative(path.dirname(file), path.join(projectRoot, destFile)).split(path.sep).join('/');
    if (!rel.startsWith('.')) rel = './'+rel;
    // return a template literal using require
    return "url(${require('"+rel+"')})";
  });

  if (updated !== content){
    fs.writeFileSync(file, updated,'utf8');
    filesUpdated++;
  }
}

console.log('Updated', filesUpdated, 'files with require(...) references.');
console.log('Done.');
