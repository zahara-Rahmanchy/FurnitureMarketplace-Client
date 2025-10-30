import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide as AnimateSlide } from "react-awesome-reveal";
import CommonOverlay from "./CommonOverlay";
const HomeSlider = () => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots bottom-0",
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in",
  };

  const slides = [
    {
      bg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
      overlayOpacity: "bg-brown-900/60",
      extra: null
    },
    {
      bg: "https://images.unsplash.com/photo-1619218005459-c8651c2f5918?q=80&w=2070&auto=format&fit=crop",
      overlayOpacity: "bg-brown-900/50",
      extra: (
        <AnimateSlide direction="left" duration={1000}>
          <h2 className="font-grechen text-2xl  font-bold italic text-white">
            Lounge Aesthetics
          </h2>
        </AnimateSlide>
      ),
    },
    {
      bg: "https://images.unsplash.com/photo-1618222499121-d6528f6d9d77?q=80&w=1932&auto=format&fit=crop",
      overlayOpacity: "bg-brown-900/50",
      extra: (
        <AnimateSlide direction="left" duration={1000}>
          <h2 className="font-grechen text-2xl  font-bold italic text-white">
            Bedroom Luxury
          </h2>
        </AnimateSlide>
      ),
    },
  ];

  return (
    <div className="w-full overflow-hidden absolute md:py-auto" >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[600px]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
            <CommonOverlay extraContent={slide.extra} />

            </div>
            <div className={`absolute inset-0 ${slide.overlayOpacity}`}></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;