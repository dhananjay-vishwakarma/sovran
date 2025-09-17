#!/bin/bash

# Navigate to the scripts directory
cd "$(dirname "$0")"

# Check if necessary packages are installed
if ! npm list glob > /dev/null 2>&1; then
  echo "Installing required dependency: glob"
  npm install glob --save-dev
fi

# Run the analysis script
echo "Analyzing media (images & videos) usage in React components..."
node analyze_image_usage.js

# Check if the analysis was successful
if [ ! -f "./media-usage-report.json" ]; then
  echo "Error: Media analysis failed! Could not find media-usage-report.json"
  exit 1
fi

# Generate a readable report
echo "Generating human-readable report..."
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

# Copy only used media to build directory
echo "Optimizing media in build directory..."
node copy_used_images.js

echo "Process completed successfully!"
echo "Please check the following reports:"
echo "- Media usage details: ./media-usage-report.json"
echo "- Human readable report: ./media-report.txt"
echo "- Optimized media report: ./optimized-media-report.json"
