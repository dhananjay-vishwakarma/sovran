#!/bin/bash

# Create the target directory if it doesn't exist
mkdir -p "../src/assets/videos"

# Copy all videos from public/assets/videos to src/assets/videos
cp -v "../public/assets/videos/"*.mp4 "../src/assets/videos/"

# Create mobile versions of videos (placeholder - in real scenario, these would be properly sized)
for video in "../public/assets/videos/"*.mp4; do
  filename=$(basename "$video")
  mobile_filename="${filename%.*}-mobile.mp4"
  cp -v "$video" "../src/assets/videos/$mobile_filename"
done

echo "Videos copied successfully!"
