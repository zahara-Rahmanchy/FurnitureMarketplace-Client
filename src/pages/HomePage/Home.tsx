import {FAQComponent} from "./FAQComponent";
import HomeSlider from "./HomeSlider";
import Types from "./Types";
import Gallery from "./Gallery";

const Home = () => {
  return (
    <>
      <div className="relative h-[700px] w-full">
        {" "}
        {/* Ensure enough space for the slider */}
        <HomeSlider />
      </div>
      <Types />
      <Gallery />
      <FAQComponent />
    </>
  );
};
export default Home;
