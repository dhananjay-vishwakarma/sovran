import React from 'react';
import { Image } from '../utils/imageCompression';

const ExampleComponent = () => {
  return (
    <div>
      <h2>Example Using Compressed Images</h2>
      
      {/* Before: Using regular img tag */}
      {/* <img src="/path/to/image.jpg" alt="Description" /> */}
      
      {/* After: Using Image component with compression */}
      <Image 
        src="/path/to/image.jpg" 
        alt="Description" 
        quality={0.8} 
        width={400} 
        height={300} 
      />
      
      {/* You can also specify different quality levels for different images */}
      <Image 
        src="/path/to/high-quality-image.jpg" 
        alt="High quality image" 
        quality={0.9} 
        className="my-custom-class"
      />
      
      {/* For lower quality images or thumbnails */}
      <Image 
        src="/path/to/thumbnail.jpg" 
        alt="Thumbnail" 
        quality={0.6} 
        width={100} 
        height={100}
        objectFit="cover"
      />
    </div>
  );
};

export default ExampleComponent;
