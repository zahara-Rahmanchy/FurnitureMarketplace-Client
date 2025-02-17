/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Card,
//   Input,
//   Button,
//   Typography,
//   DialogFooter,
// } from "@material-tailwind/react";
import {useForm} from "react-hook-form";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import {FC, useState} from "react";
import {useAppSelector} from "../../redux/hooks";
import {useAddSaleMutation} from "../../redux/features/SalesManagement/saleApi";

import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

interface ISale {
  open: boolean;
  setOpen: (value: boolean) => void;
  // handleOpen: () => void;
}
const SellProduct: FC<ISale> = ({open, setOpen}) => {
  const [Loading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const furnitureData = useAppSelector(state => state.furniture.data);

  const [AddSale] = useAddSaleMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log("sale: ", data);
    const sendSaleData = {
      id: furnitureData._id,
      saleData: {...data, furnitureData: furnitureData},
    };
    console.log(
      " sendSaleData: ",
      sendSaleData,
      furnitureData._id,
      "sendSaleData.id: ",
      sendSaleData.id
    );
    try {
      setisLoading(true);
      await AddSale(sendSaleData).unwrap();
      setisLoading(false);
      alert("Product sold successfully!");
      reset();
      navigate("/sales-history");
    } catch (err: any) {
      Swal.fire(String(err?.data?.errorMessage));
      console.error("Failed to sell the product: ", err);
    }
  };
  return (
    <Dialog
      placeholder={""}
      open={open}
      handler={() => setOpen(true)}
      size="md"
    >
      <DialogHeader
        placeholder={""}
        className="capitalize w-[90%] mx-auto flex justify-between"
      >
        <p>Sell Product</p>
        <div>
          <p className="text-md  mt-3">{furnitureData.name}</p>
          <span className="text-xs font-light -mt-3">
            {furnitureData.category}
          </span>
        </div>
      </DialogHeader>
      <DialogBody placeholder={""}>
        {Loading && (
          <div className="w-full mx-auto">
            {" "}
            <Spinner className="w-10 h-10 text-green-500 text-center" />
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mb-2 w-[95%] mx-auto"
        >
          <div className="mb-1 grid md:grid-cols-1 grid-cols-1 gap-4 mx-3">
            <div className="">
              {" "}
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Name of the Buyer
              </Typography>
              <Input
                crossOrigin={""}
                type="text"
                id="buyerName"
                {...register("buyerName", {required: true})}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.buyerName && errors.buyerName.type === "required" && (
                <p className="text-red-500 my-1 text-sm">Name is required</p>
              )}
            </div>

            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Quantity
              </Typography>
              <Input
                crossOrigin={"undefined"}
                // defaultValue={item.quantity}

                type="number"
                id="quantity"
                {...register("quantity", {
                  validate: value => value <= furnitureData.quantity,
                })}
                size="lg"
                placeholder={"5"}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.quantity && (
                <p className="text-red-500 my-1 text-sm">
                  Quantity is higher than available product stock
                </p>
              )}
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Date of Sale
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="date"
                id="dateOfSale"
                {...register("dateOfSale")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.dateofSale && errors.dateofSale.type === "required" && (
                <p className="text-red-500 my-1 text-sm">
                  Date of Sale is required.
                </p>
              )}
            </div>

            <Button
              placeholder={""}
              className="mt-5 ml-2"
              variant="gradient"
              color="green"
              type="submit"
              disabled={Loading === true}
            >
              <span>Confirm & Sell</span>
            </Button>
          </div>
        </form>
      </DialogBody>
      <DialogFooter placeholder={""}>
        <Button
          placeholder={""}
          variant="text"
          color="red"
          onClick={() => setOpen(false)}
          className="mr-1 -mt-3"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SellProduct;
