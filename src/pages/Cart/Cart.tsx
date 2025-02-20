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

const Cart = () => {
  const {data: cart, isLoading} = useGetCartItemsQuery("");
  console.log(cart);
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
                {cart?.data?.result?.map(
                  (
                    {items, quantity}: {items: any; quantity: any},
                    index: number
                  ) => {
                    const isLast = index === cart.data.result.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={items[0]?.product._id}>
                        {/* Product Image */}
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <img
                              src={items[0]?.product.image}
                              alt={items[0]?.product.name}
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
                            {items[0]?.product.name}
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            Each: ${items[0]?.product.price}
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Material: {items[0]?.product.material}
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Color: {items[0]?.product.color}
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Category: {items[0]?.product.category}
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Warranty: {items[0]?.product.warranty}
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
                            {items[0]?.product.description}
                          </Typography>
                        </td>

                        {/* Quantity Input */}
                        <td className={classes}>
                          <Input
                            crossOrigin={""}
                            placeholder={""}
                            type="number"
                            min="1"
                            value={quantity}
                            //   onChange={e =>
                            //     updateCartItem({
                            //       productId: product._id,
                            //       quantity: Number(e.target.value),
                            //     })
                            //   }
                            className="w-20 border border-gray-300 rounded-md p-2"
                          />
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
                  }
                )}
              </>
            </tbody>
          </table>
        </CardBody>

        <CardFooter
          placeholder={""}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
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
