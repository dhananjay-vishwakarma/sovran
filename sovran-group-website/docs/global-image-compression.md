# Global Image Compression for Sovran Group Website

This document explains how the global image compression system works in the Sovran Group website.

## Overview

We've implemented a solution that automatically intercepts and compresses all image requests in the application without requiring any changes to existing components or image references. This approach works by overriding the native `Image` constructor in the browser, allowing us to intercept every image that gets loaded.

## How It Works

1. When the app initializes, we override the global `window.Image` constructor
2. Any time an image's `src` is set, our code intercepts the request
3. For eligible images, we:
   - Load the original image
   - Compress it using CompressorJS
   - Replace the src with a compressed version
4. Images are cached, so subsequent requests for the same image don't require recompression

## Features

- **Zero Component Changes**: Works with all existing `<img>` tags without modification
- **Configurable Quality**: Easy to adjust compression quality via configuration
- **Selective Compression**: Automatically skips SVGs, small images, and external URLs
- **Performance Monitoring**: Logs compression statistics to help optimize settings
- **Memory Management**: Automatically cleans up resources to prevent memory leaks

## Configuration

All compression settings can be customized in the `ImageCompressorConfig.js` file:

```js
// Example configuration options
{
  // Default quality (0-1) where 1 is highest quality
  defaultQuality: 0.8,
  
  // Maximum dimensions - images larger than this will be resized
  maxWidth: 1920,
  maxHeight: 1080,
  
  // Minimum dimensions - images smaller than this won't be compressed
  minWidth: 300,
  minHeight: 300,
  
  // Paths/extensions to exclude from compression
  excludePaths: ['/assets/icons/', '/svg/'],
  
  // File extensions to exclude from compression
  excludeExtensions: ['.svg', '.gif', '.webp'],
  
  // Enable debug logging
  debug: true
}
```

## Excluding Specific Images

If you need to exclude specific images from compression, you can add the `nocompress=true` parameter to the URL:

```html
<img src="/path/to/image.jpg?nocompress=true" alt="Uncompressed image" />
```

Or programmatically:

```js
import { getUncompressedUrl } from './utils/ImageCompressor';

// Later in your code:
<img src={getUncompressedUrl('/path/to/image.jpg')} alt="Uncompressed image" />
```

## Browser Compatibility

This solution works in all modern browsers (Chrome, Firefox, Safari, Edge) but may have compatibility issues with older browsers that don't support the features we're using:

- Object.defineProperty
- Canvas API
- Blob API
- URL.createObjectURL

## Limitations

- Doesn't work for CSS background images (only `<img>` tags and Image objects)
- External images from other domains can't be compressed due to CORS restrictions
- Very small performance overhead when loading images for the first time
- Compression happens client-side, so first page load will still download original images

## Troubleshooting

If you experience any issues with image loading:

1. Check browser console for errors
2. Try disabling the compression by setting `debug: false` in the config
3. Add problematic image paths to the `excludePaths` list
4. Use the `getUncompressedUrl` function for any specific images causing problems
