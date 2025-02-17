/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  CardBody,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {useForm} from "react-hook-form";

import {useState} from "react";
import {useVerifyFurnitureQuery} from "../../redux/features/FurnitureManagement/furnitureApi";
import {FurnitureTable} from "./FurnitureTable";

const VerifyProduct = () => {
  const {register, handleSubmit} = useForm();
  const [productId, setProductId] = useState({});
  const [submit, setSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    setProductId(data);
    setSubmitted(true);
  };
  console.log(productId);
  const {
    data: furniture,
    isLoading,
    isError,
    isSuccess,
  } = useVerifyFurnitureQuery(productId);

  console.log("data: ", furniture);
  return (
    <div className="w-full mx-auto">
      {" "}
      <Typography
        className=" mx-auto mt-8  text-center"
        placeholder={""}
        variant="h4"
        color="blue-gray"
      >
        Verify Product
      </Typography>
      <Typography
        placeholder={""}
        color="gray"
        className="mt-1 font-normal text-center"
      >
        Please enter product ID to get product details.
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            placeholder={""}
            variant="h6"
            color="blue-gray"
            className="-mb-3"
          >
            Product ID
          </Typography>
          <Input
            crossOrigin={""}
            type="text"
            id="productId"
            {...register("productId")}
            size="lg"
            placeholder={""}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {isError && <p>Invalid Product ID</p>}
          {submit && isSuccess && furniture?.data?.length === 0 && (
            <p className="text-xs text-red-500 text-center">Not Available</p>
          )}
        </div>

        <Button type="submit" placeholder={""} className="mt-6" fullWidth>
          Verify
        </Button>
      </form>
      <CardBody
        className="md:overflow-x-scroll px-0 w-[70%] mx-auto "
        placeholder={""}
        // className="w-full mx-auto bg-blue-gray-100"
      >
        {isLoading && <Spinner></Spinner>}
        {furniture !== undefined && furniture.length !== 0 && (
          <FurnitureTable furnitures={furniture} />
        )}
      </CardBody>
    </div>
  );
};

export default VerifyProduct;
