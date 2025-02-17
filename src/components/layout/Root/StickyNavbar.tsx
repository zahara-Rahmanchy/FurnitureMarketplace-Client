import {useState, useEffect} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
// import type {NavbarProps} from "@material-tailwind/react";
import {useAuth} from "../../../hooks/useAuth";
import {TUser} from "../ProtectedRoute";
import {useAppDispatch} from "../../../redux/hooks";
import {logout} from "../../../redux/features/auth/authSlice";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useAuth();
  const dispatch = useAppDispatch();
  // const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Change state when scrolling down
      } else {
        setScrolled(false); // Reset state when scrolled up
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        // key={item}
        as="li"
        variant="small"
        color="white"
        placeholder={""}
        className="p-1 font-normal text-lg font-serif"
      >
        <NavLink to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        placeholder={""}
        className="p-1 font-normal text-lg font-serif"
      >
        <NavLink to={`/catalogue`} className="flex items-center">
          Catalogue
        </NavLink>
      </Typography>
      <NavLink
        className="font-serif"
        to={
          (user as TUser)?.role === "seller"
            ? "/myhub/create-product"
            : "/myhub/polish-requests"
        }
      >
        My Hub
      </NavLink>
    </ul>
  );

  return (
    <Navbar
      placeholder={""}
      color="transparent"
      className={` fixed top-0 left-0 bg-transparent rounded-none border-0 shadow-none  right-0 z-50 max-w-full py-4 px-6 
        ${scrolled ? "bg-brown-900" : "bg-none"} 
        text-white`}
    >
      <div className="flex items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="flex flex-col items-center">
          <img
            src="/image.png"
            alt="logo"
            className="w-9 h-9 rounded-full  outline-3 outline-white"
          />
          <Typography
            as="a"
            href="/"
            className="text-sm font-semibold font-grechen"
            placeholder={""}
          >
            Furniture Hub
          </Typography>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:block">{navList}</div>

        {/* Sign In Button */}
        <div className="hidden lg:block">
          {user ? (
            <Button
              onClick={() => dispatch(logout())}
              placeholder={""}
              // variant="gradient"
              size="sm"
              className="font-serif text-white bg-transparent border-2 border-white"
            >
              Logout
            </Button>
          ) : (
            <Button
              placeholder={""}
              // variant="gradient"
              size="sm"
              className="text-white bg-transparent border-2 border-white"
            >
              <NavLink to="/login"> Log In </NavLink>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          placeholder={""}
          variant="text"
          className="ml-auto h-6 w-6 text-white hover:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <MobileNav open={openNav} className="bg-brown-900 text-white">
        {navList}
        <Button placeholder={""} fullWidth size="sm">
          <NavLink to="/register">Register </NavLink>
        </Button>
      </MobileNav>
    </Navbar>
  );
}
