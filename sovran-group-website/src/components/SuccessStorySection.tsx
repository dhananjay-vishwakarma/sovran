import React from 'react';

const SuccessStorySection: React.FC = () => {
  return (
    <>
      <div className="bg-[#CDAD7D] text-[#081E27] w-full py-12">
        <section className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row rounded-lg">
            <div className="relative lg:w-[40%] flex">
              <div className="relative w-full overflow-hidden flex rounded-lg">
                <video
                  src="/assets/videos/Walkthrough.mp4"
                  className="w-full object-cover object-center rounded-lg my-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#F7F4F0]">
                  {/* Overlay if needed */}
                </div>
              </div>
            </div>

            <div className="py-4 px-6 sm:px-12 flex flex-col justify-center lg:w-[60%]">
              <div className="max-w-xl mx-auto lg:ml-8">
                <p className="uppercase text-sm tracking-wider font-medium mb-4">
                  SUCCESS STORY
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl leading-[1.25] mb-6">
                  Design Dreams Delivered: <span className="block text-xl lg:text-2xl leading-[1.4] pt-4">
                    A Seamless Renovation Experience
                  </span>
                </h2>
                <p className="text-[1.085rem] mb-6 leading-relaxed text-justify ">
                  After extensive research, we found a team whose modern, clean
                  aesthetic and high-quality finishes aligned perfectly with our
                  vision. The entire process was smooth and stress-free, thanks to
                  proactive, responsive communication and constant support for any
                  questions or last-minute tweaks. Seeing everything come together
                  in the final weeks was especially rewarding, and the attention
                  to detail and craftsmanship truly exceeded our expectations.
                </p>

                <div className="flex mt-6">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src="/assets/avatar/Daniel-Turner.png"
                      alt="Daniel Turner"
                      className="w-32 h-32 rounded-[10px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-end h-32">
                    <p className="font-medium text-lg">Daniel Turner</p>
                    <p className="text-sm text-[#081E27]/80">Sunninghill Residence</p>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <img
                          key={index}
                          src="/assets/icon/500w/SVG/8GoPIo.svg"
                          alt="Rating star"
                          width="16"
                          height="16"
                          className="mr-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </>
  );
};

export default SuccessStorySection;
