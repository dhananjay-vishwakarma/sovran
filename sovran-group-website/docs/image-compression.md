# Image Compression in Sovran Group Website

This document explains how to use the image compression features implemented in the Sovran Group website.

## Overview

We've implemented a centralized image compression solution using CompressorJS that automatically compresses images to improve website performance. The compression happens client-side in the browser, reducing the file size of images while maintaining good visual quality.

## Available Components

### 1. LazyImage Component (Already in Use)

The `LazyImage` component has been enhanced to use compression. If you're already using this component throughout the app, you'll automatically get compression benefits without any code changes.

```tsx
import LazyImage from '../components/LazyImage';

<LazyImage
  src="/path/to/image.jpg"
  alt="Description"
  className="my-image-class"
  startLoading={true}
  priority={0}
/>
```

### 2. CompressedImage Component (For Direct Use)

For more control over compression settings, you can use the `CompressedImage` component directly:

```tsx
import CompressedImage from '../components/CompressedImage';

<CompressedImage
  src="/path/to/image.jpg"
  alt="Description"
  quality={0.8} // 0.0 to 1.0, where 1.0 is highest quality
  width={400}
  height={300}
  className="my-image-class"
  objectFit="cover"
/>
```

### 3. Image Component (Drop-in Replacement for <img>)

For the simplest migration, use the `Image` component as a drop-in replacement for standard `<img>` tags:

```tsx
import { Image } from '../utils/imageCompression';

// Before
// <img src="/path/to/image.jpg" alt="Description" />

// After
<Image
  src="/path/to/image.jpg"
  alt="Description"
  quality={0.8}
  width={400}
  height={300}
/>
```

## Compression Options

- **quality**: Range from 0.0 to 1.0, where 1.0 is highest quality (default: 0.8)
- **width/height**: Target dimensions for the compressed image
- **objectFit**: How the image should fit within its container ('cover', 'contain', 'fill', etc.)
- **priority**: Higher numbers load earlier (for LazyImage)
- **startLoading**: Whether to start loading the image (for LazyImage)

## Best Practices

1. For large hero images or banners, use quality of 0.8-0.9
2. For medium-sized images, use quality of 0.7-0.8
3. For thumbnails or background images, use quality of 0.5-0.7
4. Always provide width and height when possible to avoid layout shifts
5. Use LazyImage for images that aren't immediately visible on page load

## Performance Considerations

- Image compression happens client-side, so the first time a user visits, there might be a brief delay
- Compressed images are cached in memory, so subsequent views of the same image will be faster
- For critical above-the-fold images, set priority to a higher number

## Troubleshooting

If you encounter issues with image compression:

1. Check browser console for errors
2. Try using a lower quality setting
3. For SVG images, compression is skipped automatically
4. For very small images (< 300x300px), compression is skipped as it wouldn't provide much benefit

For any questions, please contact the development team.
