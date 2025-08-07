import {FAQComponent} from "./FAQComponent";
import HomeSlider from "./HomeSlider";
import Types from "./Types";
import Gallery from "./Gallery";
import NewArrivals from "./NewArrivals";
import Newsletter from "./Newsletter";
import { Element } from "react-scroll";
const Home = () => {
  return (
    <>
      <div className="relative h-[700px] w-full">
        {" "}
        {/* Ensure enough space for the slider */}
        <HomeSlider />
      </div>
      <Types />
      <Element name="new-arrivals">
      <NewArrivals/>
      </Element>
      <Gallery />
      <Newsletter/>
      <Element name="faq-section">
        <FAQComponent />
       </Element >
    </>
  );
};
export default Home;
