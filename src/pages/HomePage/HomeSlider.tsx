// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Slide} from "react-awesome-reveal";
const HomeSlider = () => {
  const settings = {
    respondTo: "slider",

    dots: true,
    dotsClass: "slick-dots bottom-0", // Position dots at the bottom
    arrows: true, // Show arrow controls
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    fade: true,

    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed (in milliseconds)
    cssEase: "ease-in",
  };
  return (
    <div className="w-full m-0 px-0 overflow-hidden bg-blue h-full absolute top-0">
      <Slider {...settings}>
        <div className="h-[600px]">
          {/* <img
            src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            className="object-cover w-full h-[600px]"
          />
          */}
          <div
            className="hero z-10 h-[600px] flex justify-center items-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-brown-900 opacity-60"></div>

            <div className=" md:hero-content text-center text-neutral-content w-full h-fit">
              {/* <Slide> */}{" "}
              <div className=" h-full w-full  bg-opacity-80  p-3 text-center">
                <Slide direction="down" duration={5000}>
                  <h1 className="font-grechen mb-5 text-4xl mt-20 font-bold italic text-white border-0 ">
                    Transform Your Home
                    <br /> with Crafted Comfort
                  </h1>
                </Slide>
              </div>
            </div>
          </div>
        </div>

        {/* backgroundImage: `url("https://i.ibb.co/YZkyXgc/pexels-photo-6966372.jpg")`, */}
        {/* */}
        <div className="lg:h-[600px]">
          <div
            className="hero z-10 h-[600px] flex justify-center items-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1619218005459-c8651c2f5918?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0  bg-brown-900 opacity-50"></div>

            <div className=" md:hero-content text-center text-neutral-content w-full h-fit">
              {/* <Slide> */}{" "}
              <div className=" h-full w-full  bg-opacity-80  p-3">
                <Slide direction="left" duration={3000}>
                  {" "}
                  <h1 className="font-grechen mb-5 text-4xl  md:w-3/4 mx-auto  mt-20 font-bold italic text-white border-0 ">
                    Lounge Aesthetics
                  </h1>
                </Slide>
              </div>
              {/* </Slide> */}
            </div>
          </div>
        </div>
        <div className="lg:h-[600px]">
          <div
            className="hero z-10 h-[600px] flex justify-center items-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1618222499121-d6528f6d9d77?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0  bg-brown-900 opacity-50"></div>

            <div className=" md:hero-content text-center text-neutral-content w-full h-fit">
              {/* <Slide> */}{" "}
              <div className=" h-full w-full  bg-opacity-80  p-3">
                <Slide direction="left" duration={3000}>
                  {" "}
                  <h1 className="font-grechen mb-5 text-4xl  md:w-3/4 mx-auto  mt-20 font-bold italic text-white border-0 ">
                    Bedroom Luxury
                  </h1>
                </Slide>
              </div>
              {/* </Slide> */}
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
