import {
  DialogHeader,
  Dialog,
  Button,
  DialogFooter,
  DialogBody,
  Typography,
  Input,
  Avatar,
  Spinner,
} from "@material-tailwind/react";

import {FC, useState} from "react";
import {useForm} from "react-hook-form";

import ImageURL from "./utils/ImageURL";
import Swal from "sweetalert2";
import {TFurniture} from "./utils/types/TFurniture";
import {
  useAddFurnitureMutation,
  useUpdateFurnitureMutation,
} from "../../redux/features/FurnitureManagement/furnitureApi";
// import {TFurniture} from "./utils/types/TFurniture";
// import React from "react";
interface custom {
  buttonType: string;
  item: TFurniture;
  open: boolean;
  setOpen: (value: boolean) => void;
  // handleOpen: () => void;
}
const UpdateDialog: FC<custom> = ({buttonType, item, open, setOpen}) => {
  console.log("item from update: ", item);

  const [UpdateFurniture] = useUpdateFurnitureMutation();
  const {register, handleSubmit} = useForm();
  const [AddFurniture] = useAddFurnitureMutation();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("data:", data, "\nimage", data.image[0]);
    const {
      name,

      price,
      quantity,
      dimensions,
      color,
      material,
      category,
      warranty,
      type,
      description,
    } = data;

    const formData = new FormData();
    let image;
    if (data.image[0] !== undefined) {
      formData.append("image", data.image[0]);
      image = await ImageURL(formData);
    } else {
      image = item.image;
    }

    console.log(data, data.image[0]);

    const productInfo = {
      name,
      quantity,
      productId: item.productId,
      price,
      image: image,
      dimensions,
      color,
      material,
      category,
      warranty,
      type,
      description,
    };
    const sendProductData = {
      id: item._id,
      furnitureInfo: productInfo,
    };
    console.log("sendProductData: ", sendProductData);
    try {
      if (buttonType === "edit") {
        const result = await UpdateFurniture(sendProductData).unwrap();
        console.log("result: ", result);
        setOpen(false);
        Swal.fire("Product Updated Successfully!");
      }
      if (buttonType === "duplicate") {
        const result = await AddFurniture(productInfo).unwrap();
        setOpen(false);
        console.log("result: ", result);
        Swal.fire("Variant created Successfully!");
      }
      // reset();
    } catch (err) {
      Swal.fire("Failed to save!");
      console.error("Failed to save the post: ", err);
    }
  };
  //
  return (
    <Dialog
      placeholder={""}
      open={open}
      handler={() => setOpen(true)}
      size="lg"
    >
      <DialogHeader
        placeholder={""}
        className="capitalize w-[90%] mx-auto flex justify-between"
      >
        {buttonType}
        <Avatar
          src={item.image}
          alt={item.name}
          size="lg"
          placeholder={undefined}
        />
      </DialogHeader>
      <DialogBody placeholder={""}>
        {isLoading && (
          <div className="w-full h-full flex justify-center ">
            <Spinner className="h-12 w-12 text-green-500" />{" "}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mb-2 w-[95%] mx-auto"
        >
          <div className="mb-1 grid md:grid-cols-3 grid-cols-1 gap-4 mx-3">
            <div className="md:col-span-2 col-span-1">
              {" "}
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Name
              </Typography>
              <Input
                crossOrigin={""}
                type="text"
                id="name"
                {...register("name")}
                defaultValue={item.name}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="">
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Image
              </Typography>
              <Input
                crossOrigin={""}
                id="file-upload"
                type="file"
                {...register("image")}
              />
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
                defaultValue={item.quantity}
                type="number"
                id="quantity"
                {...register("quantity")}
                size="lg"
                placeholder={"5"}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Price
              </Typography>
              <Input
                crossOrigin={"undefined"}
                defaultValue={item.price}
                type="number"
                id="price"
                {...register("price")}
                size="lg"
                placeholder={"5"}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Dimensions
              </Typography>
              <Input
                defaultValue={item.dimensions}
                crossOrigin={"undefined"}
                type="text"
                id="brand"
                {...register("dimensions")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Type
              </Typography>
              <Input
                defaultValue={item.type}
                crossOrigin={""}
                id="model"
                type="text"
                {...register("type")}
              />
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Description
              </Typography>
              <Input
                defaultValue={item.description}
                crossOrigin={"undefined"}
                type="text"
                id="style"
                {...register("description")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />{" "}
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Category
              </Typography>
              <Input
                defaultValue={item.category}
                crossOrigin={"undefined"}
                type="text"
                id="style"
                {...register("category")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />{" "}
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Warranty
              </Typography>
              <Input
                defaultValue={item.warranty}
                crossOrigin={"undefined"}
                type="number"
                id="size"
                {...register("warranty")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />{" "}
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Color
              </Typography>
              <Input
                defaultValue={item.color}
                crossOrigin={"undefined"}
                type="text"
                id="color"
                {...register("color")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />{" "}
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Material
              </Typography>
              <Input
                defaultValue={item.material}
                crossOrigin={"undefined"}
                type="text"
                id="material"
                {...register("material")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>{" "}
          <Button
            placeholder={""}
            className="mt-5 ml-2"
            variant="gradient"
            color="green"
            type="submit"
            disabled={isLoading}
          >
            {buttonType === "edit" ? (
              <span>Confirm & Update</span>
            ) : (
              <span>Create Variant</span>
            )}
          </Button>
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

export default UpdateDialog;
