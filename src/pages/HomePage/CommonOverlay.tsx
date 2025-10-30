
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide as AnimateSlide } from "react-awesome-reveal";
import { Button, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";


const CommonOverlay = ({ extraContent }:{extraContent:ReactNode}) => {
  return (
    <div className="absolute  inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
      <AnimateSlide direction="down" duration={1500}>
        <h1 className="font-grechen mb-5 md:text-5xl text-4xl font-bold italic text-white">
          Transform Your Home
          <br /> with Crafted Comfort
        </h1>
        <h3 className="md:text-3xl text-2xl text-white shadow-2xl mb-5">
          Furniture that Finds You
        </h3>
        {/* <hr className="w-1/2 mx-auto border-t-2 border-white my-4" /> */}
        <Typography placeholder={""} variant="paragraph" className="text-white border-t-2 pt-5 border-white">
          Not just another marketplace — it’s where your next cozy chair
          <br /> or quirky coffee table is waiting. Sell your old stuff or find
          something with character.
        </Typography>
        <div className="flex items-center justify-center gap-7 mt-8">
          <Button placeholder={""} className="bg-brown-800 shadow-2xl text-white">
            Explore Furniture
          </Button>
          <Button placeholder={""} variant="outlined" className="bg-black text-white">
            🛒 Become a Seller
          </Button>
        </div>
        {extraContent && <div className="mt-8">{extraContent}</div>}
      </AnimateSlide>
    </div>
  );
};

export default CommonOverlay