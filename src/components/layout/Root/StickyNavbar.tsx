import {useState, useEffect} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
  Badge,
} from "@material-tailwind/react";
import {NavLink, useLocation} from "react-router-dom";
// import type {NavbarProps} from "@material-tailwind/react";
import {useAuth} from "../../../hooks/useAuth";
import {TUser} from "../ProtectedRoute";
import {useAppDispatch} from "../../../redux/hooks";
import {logout} from "../../../redux/features/auth/authSlice";
import {useGetCartItemsQuery} from "../../../redux/features/Cart/cartApi";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log("loca: ", location.pathname);
  const {data: cart} = useGetCartItemsQuery("");
  console.log("cart: ", cart?.data?.TotalCartItems);

  // const totalItems = ;
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
    <ul className="lg:ms-0 ms-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
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
        className="p-1  font-normal text-lg font-serif"
      >
        <NavLink to={`/catalogue`} className="flex items-center">
          Catalogue
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        placeholder={""}
        className="p-1  font-normal text-lg font-serif"
      >
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
      </Typography>
    </ul>
  );

  const navActions = (
    <div className="justify-evenly flex lg:flex-row flex-col lg:gap-0 gap-3 lg:ps-0 ps-3  items-start lg:items-center">
      <Badge
        content={user && cart != undefined && cart?.data?.TotalCartItems}
        placement="top-start"
        color="orange"
        className="text-white"
        withBorder
      >
        <Typography
          placeholder={""}
          as="li"
          variant="small"
          color="white"
          className="p-1 font-normal text-lg font-serif"
        >
          <NavLink to="/cart" className="me-4 float-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </NavLink>
        </Typography>
      </Badge>
      {user ? (
        <Button
          placeholder={""}
          onClick={() => dispatch(logout())}
          size="sm"
          className="font-serif text-white bg-transparent border-2 border-white"
        >
          Logout
        </Button>
      ) : (
        <Button
          placeholder={""}
          size="sm"
          className="text-white shadow-none bg-transparent border-2 border-white"
        >
          <NavLink to="/login">Log In</NavLink>
        </Button>
      )}
    </div>
  );

  return (
    <Navbar
      placeholder={""}
      color="transparent"
      className={` fixed top-0 left-0 bg-transparent rounded-none border-0 shadow-none  right-0 z-50 max-w-full py-2 px-6 
        ${scrolled ? "bg-brown-900" : "bg-none"} 
     
        text-white`}
    >
      <div className="flex flex-row items-center justify-between">
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
        {/* <div className=" lg:justify-evenly hidden lg:flex justify-end items-center">
          <Typography
            as="li"
            variant="small"
            color="white"
            placeholder={""}
            className="p-1  font-normal text-lg font-serif"
          >
            <NavLink to="/cart" className="me-4 float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </NavLink>
          </Typography>
        
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
        </div> */}
        <div className="hidden lg:block">{navActions}</div>

        {/* Mobile Menu Button */}
        <IconButton
          placeholder={""}
          variant="text"
          className="ml-auto min-h-12 w-6 text-white hover:bg-transparent lg:hidden"
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
      <MobileNav open={openNav} className="bg-brown-900 text-white py-3">
        {navList}
        {navActions}
        {/* <div className="flex flex-col justify-evenly gap-3 ps-3">
          <Typography
            as="li"
            variant="small"
            color="white"
            placeholder={""}
            className="p-1  font-normal text-lg font-serif"
          >
            <NavLink to="/cart" className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </NavLink>
          </Typography>
          <div className="mb-4">
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
          </div>{" "}
        </div> */}
      </MobileNav>
    </Navbar>
  );
}
