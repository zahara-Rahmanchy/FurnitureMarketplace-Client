import {Button, Card, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {useCreatePolishRequestMutation} from "../../redux/features/PolishManagement/polishApi";
import BuyerRequests from "./BuyerRequests";

const PolishRequest = () => {
  const {register, handleSubmit, reset} = useForm();
  const [disable, setDisable] = useState(false);
  const [CreatePolishRequest] = useCreatePolishRequestMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    setDisable(true);
    try {
      setDisable(true);
      await CreatePolishRequest(data).unwrap();
      alert("Product Added Successfully!");

      reset();
      setDisable(false);

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
          color="blue-gray"
        >
          Polish Request
        </Typography>
        <Typography
          placeholder={""}
          color="gray"
          className="mt-1 font-normal text-center"
        >
          Please enter your details for polish service.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-[80%] mx-auto"
        >
          <div className="mb-1 grid md:grid-cols-3 grid-cols-1 gap-4 mx-3 ">
            <div className=" col-span-1">
              {" "}
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Furniture Name
              </Typography>
              <Input
                crossOrigin={""}
                type="text"
                id="name"
                {...register("furnitureName")}
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
                Type of Polish
              </Typography>
              <Input
                crossOrigin={"undefined"}
                placeholder="(e.g. regular / premium)"
                type="text"
                id="polishType"
                {...register("polishType")}
                size="lg"
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
                Type of Finish
              </Typography>
              <Input
                crossOrigin={""}
                placeholder="(e.g. matte / glossy)"
                id="model"
                type="text"
                {...register("finishType")}
              />
            </div>
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Type of Wood
              </Typography>
              <Input
                crossOrigin={""}
                placeholder="(e.g. oak)"
                id="model"
                type="text"
                {...register("woodType")}
              />
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
            <div className=" col-span-1">
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Other Instructions
              </Typography>
              <Input
                crossOrigin={"undefined"}
                type="textarea"
                id="instructions"
                {...register("instructions")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />{" "}
            </div>
            <div className=" justify-center items-center flex">
              <Button
                type="submit"
                placeholder={""}
                // size="sm"
                className="mt-7"
                fullWidth
                disabled={disable}
              >
                Submit Request
              </Button>
            </div>
          </div>
        </form>
        <div className="w-[80%] mx-auto mt-7  flex justify-center flex-col items-center">
          {" "}
          <Typography
            className=" mx-auto mb-8 text-center"
            placeholder={""}
            variant="h5"
            color="blue-gray"
          >
            Polish Request Details
          </Typography>
          <BuyerRequests />
        </div>
      </Card>
    </div>
  );
};

export default PolishRequest;
