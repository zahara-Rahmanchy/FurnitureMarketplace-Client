import {FAQComponent} from "./FAQComponent";
import HomeSlider from "./HomeSlider";
import Types from "./Types";
import Gallery from "./Gallery";
import NewArrivals from "./NewArrivals";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <>
      <div className="relative h-[700px] w-full">
        {" "}
        {/* Ensure enough space for the slider */}
        <HomeSlider />
      </div>
      <Types />
      <NewArrivals/>

      <Gallery />
      <Newsletter/>
      <FAQComponent />
    </>
  );
};
export default Home;
