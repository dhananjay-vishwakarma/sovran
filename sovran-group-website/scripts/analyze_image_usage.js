const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Paths to scan
const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const REPORT_FILE = path.resolve(__dirname, './media-usage-report.json');

// Extensions to scan
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css'];

// Media file extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];

// Function to find all source files
function findSourceFiles() {
  const files = [];
  EXTENSIONS.forEach(ext => {
    const pattern = `${SRC_DIR}/**/*${ext}`;
    const matches = glob.sync(pattern);
    files.push(...matches);
  });
  return files;
}

// Function to extract media references from file content
function extractMediaReferences(fileContent, filePath) {
  const references = [];
  
  // Match import statements for media files
  const imageExtPattern = IMAGE_EXTENSIONS.map(ext => ext.substring(1)).join('|');
  const videoExtPattern = VIDEO_EXTENSIONS.map(ext => ext.substring(1)).join('|');
  const mediaExtPattern = `${imageExtPattern}|${videoExtPattern}`;
  
  // Match import statements
  const importRegex = new RegExp(`import\\s+(?:\\w+|\\{[^}]+\\})\\s+from\\s+['"]([^'"]+\\.(${mediaExtPattern}))['"];?`, 'g');
  let match;
  while ((match = importRegex.exec(fileContent)) !== null) {
    references.push({
      type: 'import',
      path: match[1],
      file: filePath,
      mediaType: VIDEO_EXTENSIONS.some(ext => match[1].endsWith(ext)) ? 'video' : 'image'
    });
  }
  
  // Match require statements
  const requireRegex = new RegExp(`require\\(['"]([^'"]+\\.(${mediaExtPattern}))['"](\\))?`, 'g');
  while ((match = requireRegex.exec(fileContent)) !== null) {
    references.push({
      type: 'require',
      path: match[1],
      file: filePath,
      mediaType: VIDEO_EXTENSIONS.some(ext => match[1].endsWith(ext)) ? 'video' : 'image'
    });
  }
  
  // Match media src attributes for images and videos - IMPROVED to handle absolute paths and query params
  const srcRegex = /src\s*=\s*{?['"]((?:\/|\.\.?\/)?[^'"]+?(?:\.(png|jpg|jpeg|gif|svg|webp|mp4|webm|ogg|mov|avi|mkv))(?:\?[^'"]*)?)['"]}?/gi;
  while ((match = srcRegex.exec(fileContent)) !== null) {
    // Extract base path without query string
    const fullPath = match[1];
    const basePath = fullPath.split('?')[0];
    
    references.push({
      type: 'src',
      path: fullPath,
      basePath: basePath,
      file: filePath,
      mediaType: VIDEO_EXTENSIONS.some(ext => basePath.toLowerCase().endsWith(ext)) ? 'video' : 'image'
    });
  }
  
  // Match media paths in CSS - IMPROVED to handle absolute paths and query params
  const cssRegex = /url\(['"]?((?:\/|\.\.?\/)?[^'")\s]+?(?:\.(png|jpg|jpeg|gif|svg|webp))(?:\?[^'")]*)?)['")\s]?/gi;
  while ((match = cssRegex.exec(fileContent)) !== null) {
    // Extract base path without query string
    const fullPath = match[1];
    const basePath = fullPath.split('?')[0];
    
    references.push({
      type: 'css',
      path: fullPath,
      basePath: basePath,
      file: filePath,
      mediaType: 'image' // CSS url() typically only references images
    });
  }
  
  // Match asset paths with absolute URL pattern (starting with /)
  const absolutePathRegex = /['"](\/assets\/(?:images|videos|video|logo|svgs)\/[^'"]+?(?:\.(png|jpg|jpeg|gif|svg|webp|mp4|webm|ogg|mov|avi|mkv))(?:\?[^'"]*)?)['"]/gi;
  while ((match = absolutePathRegex.exec(fileContent)) !== null) {
    // Extract base path without query string
    const fullPath = match[1];
    const basePath = fullPath.split('?')[0];
    
    references.push({
      type: 'absolute',
      path: fullPath,
      basePath: basePath,
      file: filePath,
      mediaType: VIDEO_EXTENSIONS.some(ext => basePath.toLowerCase().endsWith(ext)) ? 'video' : 'image'
    });
  }
  
  // Match direct media paths with special handling for complex paths (with spaces, special chars)
  const directPathRegex = /['"]([^'"]*?(?:\/|\\)(?:assets|images|videos|video|logo|svgs)(?:\/|\\)[^'"]+?(?:\.(png|jpg|jpeg|gif|svg|webp|mp4|webm|ogg|mov|avi|mkv))(?:\?[^'"]*)?)['"]/gi;
  while ((match = directPathRegex.exec(fileContent)) !== null) {
    // Extract base path without query string
    const fullPath = match[1];
    const basePath = fullPath.split('?')[0];
    
    references.push({
      type: 'direct',
      path: fullPath,
      basePath: basePath,
      file: filePath,
      mediaType: VIDEO_EXTENSIONS.some(ext => basePath.toLowerCase().endsWith(ext)) ? 'video' : 'image'
    });
  }
  
  return references;
}

// Function to resolve media paths to absolute paths
function resolveMediaPaths(references) {
  const resolved = [];
  
  references.forEach(ref => {
    // Use basePath if available, otherwise use path
    const relPath = ref.basePath || ref.path;
    // Remove query parameters if present
    const cleanPath = relPath.split('?')[0];
    // Decode URI components to handle spaces and special characters
    const decodedPath = decodeURIComponent(cleanPath.replace(/\\/g, '/'));
    
    let absolutePath = null;
    
    // Handle absolute paths (starting with /)
    if (decodedPath.startsWith('/')) {
      // Remove leading slash and try in public directory
      const publicPath = decodedPath.substring(1);
      absolutePath = path.resolve(PUBLIC_DIR, publicPath);
      
      // If not found, try as is in public directory
      if (!fs.existsSync(absolutePath)) {
        // Some frameworks might expect assets in the root of public
        const possiblePaths = [
          path.resolve(PUBLIC_DIR, decodedPath),  // With leading slash
          path.resolve(PUBLIC_DIR, 'assets', decodedPath.substring(1))  // Under assets folder
        ];
        
        for (const testPath of possiblePaths) {
          if (fs.existsSync(testPath)) {
            absolutePath = testPath;
            break;
          }
        }
      }
    } else {
      // For relative paths, try multiple resolution strategies
      
      // 1. Try to resolve relative to the component
      let sourcePath = path.dirname(ref.file);
      absolutePath = path.resolve(sourcePath, decodedPath);
      
      // 2. If file doesn't exist, try resolving relative to src directory
      if (!fs.existsSync(absolutePath)) {
        const srcPath = decodedPath.replace(/^\.\.?\//g, '');
        absolutePath = path.resolve(SRC_DIR, srcPath);
      }
      
      // 3. If still doesn't exist, try resolving relative to public directory
      if (!fs.existsSync(absolutePath)) {
        const publicPath = decodedPath.replace(/^\.\.?\//g, '');
        absolutePath = path.resolve(PUBLIC_DIR, publicPath);
      }
      
      // 4. If still doesn't exist, check if it's an asset path that should be in public
      if (!fs.existsSync(absolutePath) && 
          (decodedPath.includes('/assets/') || 
           decodedPath.includes('/images/') || 
           decodedPath.includes('/videos/'))) {
        // Try removing everything before and including assets, images, or videos
        const assetPathMatch = decodedPath.match(/(?:.*?)((?:assets|images|videos)\/.*)/);
        if (assetPathMatch && assetPathMatch[1]) {
          absolutePath = path.resolve(PUBLIC_DIR, assetPathMatch[1]);
        }
      }
    }
    
    // If a valid file was found, add it to the resolved list
    if (absolutePath && fs.existsSync(absolutePath)) {
      resolved.push({
        ...ref,
        absolutePath,
        relativePath: path.relative(path.resolve(__dirname, '..'), absolutePath)
      });
    } else {
      // Log unresolved paths for debugging
      console.log(`Could not resolve path: ${decodedPath} (from ${ref.file})`);
    }
  });
  
  return resolved;
}

// Main function
function analyzeMediaUsage() {
  console.log('Analyzing media (images & videos) usage in React components...');
  
  // Add specific known media paths that might be missed by the scanner
  const knownMediaPaths = [
    '/assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/3D renders/Bushra Kitchen View.jpg',
    '/assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249428-HDR.jpg',
    '/assets/images/Background-image-for-finance-5-years-Taaj-Kitchens-1.png'
  ];
  
  const sourceFiles = findSourceFiles();
  console.log(`Found ${sourceFiles.length} source files to scan`);
  
  let allReferences = [];
  
  sourceFiles.forEach(filePath => {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const references = extractMediaReferences(fileContent, filePath);
      allReferences.push(...references);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
    }
  });
  
  // Add the known media paths as explicit references
  knownMediaPaths.forEach(mediaPath => {
    allReferences.push({
      type: 'explicit',
      path: mediaPath,
      basePath: mediaPath.split('?')[0],
      file: 'EXPLICIT_INCLUDE',
      mediaType: mediaPath.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i) ? 'video' : 'image'
    });
  });
  
  console.log(`Found ${allReferences.length} media references (including ${knownMediaPaths.length} explicit inclusions)`);
  
  // Resolve all paths
  const resolvedReferences = resolveMediaPaths(allReferences);
  console.log(`Resolved ${resolvedReferences.length} media paths`);
  
  // Group by media path
  const groupedByMedia = {};
  resolvedReferences.forEach(ref => {
    if (!groupedByMedia[ref.relativePath]) {
      groupedByMedia[ref.relativePath] = [];
    }
    groupedByMedia[ref.relativePath].push({
      file: path.relative(path.resolve(__dirname, '..'), ref.file),
      type: ref.type,
      mediaType: ref.mediaType
    });
  });
  
  // Write report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(groupedByMedia, null, 2));
  console.log(`Report written to ${REPORT_FILE}`);
  
  return groupedByMedia;
}

// Run the analysis
const usedMedia = analyzeMediaUsage();

// Export the data for use in other scripts
module.exports = usedMedia;
