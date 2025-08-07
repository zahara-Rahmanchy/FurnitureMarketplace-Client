/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import {PencilIcon} from "@heroicons/react/24/solid";

import {
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  Spinner,
} from "@material-tailwind/react";

import {Card} from "@material-tailwind/react";
import {useGetCartItemsQuery} from "../../redux/features/Cart/cartApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCartFromDB } from "../../redux/features/Cart/cartSlice";

const Cart = () => {
  const {data: cart, isLoading} = useGetCartItemsQuery("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(cart,"\ncart?.data?.result?.items: ",cart?.data?.result?.items[0].product.name);
   useEffect(() => {
    if (cart?.data?.result?.items?.length) {
      dispatch(setCartFromDB(cart.data.result.items));
    }
  }, [cart, dispatch]);

  // Get items from Redux state for local UI usage & updates
  const items = useAppSelector(state => state.cart.items);
  const TABLE_HEAD = [
    "Product",
    "Details",
    "Description",
    "Quantity",
    "Actions",
  ];
  const placeOrder = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to place the order? You cannot revert from this!`
    );
    if (userConfirmed) {
      alert(`order placed successfully!`);
      navigate("/checkout")
    }
  };

  return (
    <>
      <div className=" bg-brown-800 w-full min-h-[90px]"></div>

      <Card placeholder={""} className="h-full w-[90%] mx-auto mt-20">
        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <Typography placeholder={""} variant="h5" color="blue-gray">
              Total Products: {cart?.data?.TotalCartItems}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0" placeholder={""}>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map(head => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <>
                {" "}
                {isLoading && <Spinner />}
                {/* {cart?.data?.result?.items?.map(
                  ({item}: {item: any}, index: number) => {
                    const isLast = index === cart.data.result.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50"; */}
                {items?.map((item: any, index: number) => {
                  const isLast =
                    index === items?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={item?.product._id}>
                      {/* Product Image */}
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <img
                            src={item?.product?.image}
                            alt={item?.product?.name}
                            className=" w-[300px] h-60 rounded-md object-contain"
                          />
                        </div>
                      </td>

                      {/* Product Details */}
                      <td className={classes}>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {item?.product?.name}
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          Each: ${item?.product?.price}
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          Material: {item?.product?.material}
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          Color: {item?.product?.color}
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          Category: {item?.product?.category}
                        </Typography>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          Warranty: {item?.product?.warranty}
                        </Typography>
                      </td>

                      {/* Product Description */}
                      <td className={classes}>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-wrap w-48"
                        >
                          {item?.product?.description}
                        </Typography>
                      </td>

                      {/* Quantity Input */}
                      <td className={classes}>
                        <Input
                          crossOrigin={""}
                          placeholder={""}
                          type="number"
                          min="1"
                          value={item?.quantity}
                          //   onChange={e =>
                          //     updateCartItem({
                          //       productId: product._id,
                          //       quantity: Number(e.target.value),
                          //     })
                          //   }
                          className="w-20 border border-gray-300 rounded-md p-2"
                        />
                        <Typography placeholder={""} className="mt-3">
                          <span className="font-bold text-black">
                            {" "}
                            Total Price: $
                          </span>{" "}
                          {item?.quantity * item?.product?.price}
                        </Typography>
                      </td>

                      {/* Edit Action */}
                      <td className={classes}>
                        <Tooltip content="Edit Product">
                          <IconButton variant="text" placeholder={""}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </>
            </tbody>
          </table>
        </CardBody>

        <CardFooter
          placeholder={""}
          className="flex items-center justify-end border-t border-blue-gray-50 p-4"
        >
          {/* <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div> */}
          <Button
            placeholder={""}
            variant="outlined"
            size="sm"
            className="bg-orange-800 text-white border-gray-300 border-2 shadow-lg"
            onClick={placeOrder}
          >
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Cart;
