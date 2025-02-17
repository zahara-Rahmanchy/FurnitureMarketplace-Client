import {Outlet} from "react-router-dom";
import {StickyNavbar} from "./StickyNavbar";
import {Footer} from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <header>
        <StickyNavbar />{" "}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {" "}
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
