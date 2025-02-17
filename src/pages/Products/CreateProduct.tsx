import {
  Card,
  Input,
  Button,
  Typography,
  // Spinner,
} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import ImageURL from "./utils/ImageURL";
import {useAddFurnitureMutation} from "../../redux/features/FurnitureManagement/furnitureApi";
import {useState} from "react";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const [AddFurniture] = useAddFurnitureMutation();
  const {register, handleSubmit, reset} = useForm();
  const [disable, setDisable] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    const {
      name,
      productId,
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
    formData.append("image", data.image[0]);
    const image = await ImageURL(formData);

    console.log(data, data.image[0]);
    console.log(image);
    const productInfo = {
      name,
      productId,
      quantity,
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
    try {
      setDisable(true);
      await AddFurniture(productInfo).unwrap();
      alert("Product Added Successfully!");
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire(String(err.data.errorMessage));
      console.error("Failed to save the post: ", err);
    }
  };
  return (
    <div className="w-full h-fit ">
      <Card
        className="w-full  flex flex-col  justify-normal h-screen"
        placeholder={""}
        color="transparent"
        shadow={false}
      >
        {/* {isLoading && <Spinner className="h-12 w-12" />} */}
        <Typography
          className=" mx-auto mt-8"
          placeholder={""}
          variant="h4"
          color="brown"
        >
          ADD TO INVENTORY
        </Typography>
        <Typography
          placeholder={""}
          color="gray"
          className="mt-1 font-normal text-center"
        >
          Please enter your details to of Furnitures.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-[95%] mx-auto"
        >
          <div className="mb-1 grid md:grid-cols-3 grid-cols-1 gap-4 mx-3">
            <div>
              {" "}
              <Typography
                placeholder={""}
                variant="h6"
                color="brown"
                className="mb-3"
              >
                Name
              </Typography>
              <Input
                crossOrigin={""}
                type="text"
                id="name"
                {...register("name")}
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
                color="brown"
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
                color="brown"
                className="mb-3"
              >
                Product ID
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="text"
                id="productId"
                {...register("productId")}
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
                color="brown"
                className="mb-3"
              >
                Quantity
              </Typography>
              <Input
                crossOrigin={"undefined"}
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
                color="brown"
                className="mb-3"
              >
                Price
              </Typography>
              <Input
                crossOrigin={"undefined"}
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
                color="brown"
                className="mb-3"
              >
                Dimensions (with units)
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="text"
                id="style"
                {...register("dimensions")}
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
                color="brown"
                className="mb-3"
              >
                Category
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="text"
                id="brand"
                {...register("category")}
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
                color="brown"
                className="mb-3"
              >
                Warranty
              </Typography>
              <Input
                crossOrigin={""}
                id="model"
                type="text"
                {...register("warranty")}
              />
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="brown"
                className="mb-3"
              >
                Type
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="text"
                id="style"
                {...register("type")}
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
                color="brown"
                className="mb-3"
              >
                Color
              </Typography>
              <Input
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
                color="brown"
                className="mb-3"
              >
                Material
              </Typography>
              <Input
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
            <div className="w-full">
              <Typography
                placeholder={""}
                variant="h6"
                color="brown"
                className="mb-3"
              >
                Description
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="textfield"
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
          </div>
          <Button
            type="submit"
            placeholder={""}
            className="mt-6 bg-brown-900"
            fullWidth
            disabled={disable}
          >
            Add Product
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateProduct;
