import React, {useState} from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  PowerIcon,
  XMarkIcon,
  Bars3Icon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {
  logout,
  useCurrentToken,
  // useCurrentUser,
} from "../../../redux/features/auth/authSlice";
import {NavLink} from "react-router-dom";
import {SquaresPlusIcon} from "@heroicons/react/20/solid";
import {verifyToken} from "../../../utils/verifyToken";
import {TUser} from "../ProtectedRoute";

export function SideBar() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(0);
  // const user = useAppSelector(useCurrentUser);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleOpen = (value: React.SetStateAction<number>) => {
    console.log(value);
    setOpen(open === value ? 0 : value);
  };

  const handleSidebar = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  console.log("user sidebar: ", user);

  return (
    <>
      <IconButton
        placeholder={""}
        onClick={handleSidebar}
        className={isDrawerOpen ? "md:hidden" : "block"}
        variant="text"
        size="lg"
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>

      {(isDrawerOpen || window.innerWidth >= 768) && (
        <Card
          placeholder={""}
          className="h-full w-full max-w-[20rem] p-4  shadow-xl shadow-blue-gray-900/5 md:block"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            {/* <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            /> */}
            <Typography
              placeholder={""}
              variant="h5"
              color="brown"
              className="cursor-pointer"
            >
              {(user as TUser)?.role === "seller"
                ? "Furniture Inventory"
                : "My Hub"}
              <NavLink to="/"></NavLink>
            </Typography>
          </div>

          <List placeholder={""}>
            <Accordion
              placeholder={""}
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`text-brown-800 mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem placeholder={""} className="p-0" selected={open === 1}>
                <AccordionHeader
                  placeholder={""}
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix placeholder={""}>
                    <PresentationChartBarIcon className="h-5 w-5 text-brown-800" />
                  </ListItemPrefix>
                  <Typography
                    placeholder={""}
                    color="brown"
                    className="mr-auto font-normal"
                  >
                    Furnitures
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List placeholder={""} className="p-0">
                  {((user as TUser)?.role === "seller" || "buyer") && (
                    <ListItem placeholder={""}>
                      <ListItemPrefix placeholder={""}>
                        <StopCircleIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-brown-800"
                        />
                      </ListItemPrefix>
                      <NavLink
                        to="/myhub/furniture-stock"
                        className="text-brown-800"
                      >
                        My Furnitures
                      </NavLink>
                    </ListItem>
                  )}

                  {(user as TUser)?.role === "seller" && (
                    <ListItem placeholder={""}>
                      <ListItemPrefix placeholder={""}>
                        <SquaresPlusIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-brown-800"
                        />
                      </ListItemPrefix>
                      <NavLink
                        to="/myhub/create-product"
                        className="text-brown-800"
                      >
                        Add Furniture
                      </NavLink>
                    </ListItem>
                  )}
                  {(user as TUser)?.role === "buyer" ? (
                    <ListItem placeholder={""}>
                      <ListItemPrefix placeholder={""}>
                        <SquaresPlusIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-brown-800"
                        />
                      </ListItemPrefix>
                      <NavLink
                        to="/myhub/polish-requests"
                        className="text-brown-800"
                      >
                        Polish Service
                      </NavLink>
                    </ListItem>
                  ) : (
                    (user as TUser)?.role === "seller" && (
                      <ListItem placeholder={""}>
                        <ListItemPrefix placeholder={""}>
                          <SquaresPlusIcon
                            strokeWidth={3}
                            className="h-3 w-5 text-brown-800"
                          />
                        </ListItemPrefix>
                        <NavLink
                          to="/myhub/polish-service"
                          className="text-brown-800"
                        >
                          Polish Service
                        </NavLink>
                      </ListItem>
                    )
                  )}

                  {(user as TUser)?.role === "seller" && (
                    <ListItem placeholder={""}>
                      <ListItemPrefix placeholder={""}>
                        <SquaresPlusIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-brown-800"
                        />
                      </ListItemPrefix>
                      <NavLink to="/myhub/low-stock" className={"text-red-500"}>
                        Low Stock
                      </NavLink>
                    </ListItem>
                  )}
                </List>
              </AccordionBody>
              
                  {((user as TUser)?.role === "seller" || "buyer") && (
                    <ListItem placeholder={""}>
                      <ListItemPrefix placeholder={""}>
                     <Square2StackIcon  strokeWidth={3} className="h-5 w-5 text-brown-800"/>
                      </ListItemPrefix>
                      <NavLink to="/myhub/orders" className={"text-brown-900"}>
                        My Orders
                      </NavLink>
                    </ListItem>
                  )}
            </Accordion>
            {(user as TUser)?.role === "seller" && (
              <Accordion
                placeholder={""}
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 2 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem
                  placeholder={""}
                  className="p-0"
                  selected={open === 2}
                >
                  <AccordionHeader
                    placeholder={""}
                    onClick={() => handleOpen(2)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix placeholder={""}>
                      <ShoppingBagIcon className="h-5 w-5 text-brown-800" />
                    </ListItemPrefix>
                    <Typography
                      placeholder={""}
                      color="brown"
                      className="mr-auto font-normal text-brown-800"
                    >
                      Sales Management
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List placeholder={""} className="p-0">
                    <ListItem placeholder={""}>
                      <ListItemPrefix placeholder={""}>
                        <SquaresPlusIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-brown-800"
                        />
                      </ListItemPrefix>
                      <NavLink
                        to="/myhub/sales-history"
                        className="text-brown-800"
                      >
                        Sales History
                      </NavLink>
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
            )}
            {(user as TUser)?.role === "buyer" && (
              <ListItem placeholder={""}>
                <ListItemPrefix placeholder={""}>
                  <CheckBadgeIcon className="h-5 w-5 text-brown-800" />
                </ListItemPrefix>
                <NavLink to="/myhub/verify-product" className="text-brown-800">
                  Verify Product
                </NavLink>
              </ListItem>
            )}
            <hr className="my-2 border-blue-gray-50" />
            {user && (
              <ListItem placeholder={""}>
                <ListItemPrefix placeholder={""}>
                  <PowerIcon className="h-5 w-5 text-brown-800" />
                </ListItemPrefix>
                <button onClick={handleLogOut}>Log Out</button>
              </ListItem>
            )}
          </List>
        </Card>
      )}
    </>
  );
}
