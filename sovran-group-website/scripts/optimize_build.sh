#!/bin/bash

# Navigate to the scripts directory
cd "$(dirname "$0")"

echo "==== Starting complete image optimization process ===="

# Check if necessary packages are installed
if ! npm list glob > /dev/null 2>&1; then
  echo "Installing required dependency: glob"
  npm install glob --save-dev
fi

# Check for sharp package (used in resize_large_images.js)
if ! npm list sharp > /dev/null 2>&1; then
  echo "Installing recommended dependency: sharp (for better image processing)"
  npm install sharp --save-dev
fi

# Run the analysis script
echo "Step 1: Analyzing media usage in React components..."
node analyze_image_usage.js

# Check if the analysis was successful
if [ ! -f "./media-usage-report.json" ]; then
  echo "Error: Media analysis failed! Could not find media-usage-report.json"
  exit 1
fi

# Generate human-readable report (optional)
echo "Step 2: Generating human-readable reports..."
node -e '
const fs = require("fs");
const path = require("path");
const mediaData = require("./media-usage-report.json");

let report = "# Media Usage Report\n\n";
report += `Generated on ${new Date().toLocaleString()}\n\n`;

// Count images and videos
const imageCount = Object.entries(mediaData).filter(([_, usages]) => 
  usages.some(usage => usage.mediaType === "image")
).length;

const videoCount = Object.entries(mediaData).filter(([_, usages]) => 
  usages.some(usage => usage.mediaType === "video")
).length;

report += `Total media files used: ${Object.keys(mediaData).length}\n`;
report += `Images: ${imageCount}\n`;
report += `Videos: ${videoCount}\n\n`;

report += "## Media Files Used in Components\n\n";

Object.entries(mediaData).forEach(([mediaPath, usages]) => {
  const mediaType = usages[0]?.mediaType || "unknown";
  report += `### ${mediaPath} (${mediaType})\n\n`;
  report += "Used in the following files:\n\n";
  
  usages.forEach(usage => {
    report += `- ${usage.file} (${usage.type})\n`;
  });
  
  report += "\n";
});

fs.writeFileSync("./media-report.txt", report);
console.log("Report written to media-report.txt");
'

# Process the build directory if it exists
if [ -d "../build" ]; then
  # Step 3: Only copy used media to build
  echo "Step 3: Optimizing media in build directory (removing unused files)..."
  node copy_used_images.js
  
  # Step 4: Resize large images
  echo "Step 4: Resizing oversized images in build directory..."
  node resize_large_images.js
  
  # Step 5: Resize large videos
  echo "Step 5: Resizing oversized videos in build directory..."
  node resize_large_videos.js
else
  echo "Warning: No build directory found at ../build"
  echo "To optimize the build, run 'npm run build' before running this script."
fi

echo "==== Complete image optimization process finished ===="
echo "Please check the following reports:"
echo "- Media usage details: ./media-usage-report.json"
echo "- Human readable report: ./media-report.txt"
echo "- Optimized media report: ./optimized-media-report.json"
echo "- Resized images report: ./resized-images-report.json"
