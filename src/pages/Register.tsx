/* eslint-disable @typescript-eslint/no-explicit-any */
import {Card, Input, Button, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {useRegisterUserMutation} from "../redux/features/auth/authApi";
import {NavLink, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
// "username":"zahara123",
//     "password": "123456"
const Register = () => {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const [registerUser, {error}] = useRegisterUserMutation();

  console.log("error: ", error);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await registerUser(data).unwrap();
      Swal.fire("Registered Successfully! Please Login");
      // reset();
      navigate("/login");
    } catch (err: any) {
      Swal.fire(String(err.data.errorMessage));
      console.log("Failed to save the post: ", err);
    }
  };
  return (
    <>
      {" "}
      <div>
        <div className=" bg-brown-800 w-full min-h-[90px]"></div>
        <Card
          className="flex flex-col items-center justify-center  h-screen"
          placeholder={""}
          color="transparent"
          shadow={false}
        >
          <Typography
            className=" mx-auto"
            placeholder={""}
            variant="h4"
            color="blue-gray"
          >
            Register
          </Typography>
          <Typography
            placeholder={""}
            color="gray"
            className="mt-1 font-normal text-center"
          >
            Please enter your details to create and account.
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
                Username
              </Typography>
              <Input
                crossOrigin={""}
                type="text"
                id="username"
                {...register("username")}
                size="lg"
                placeholder={""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                placeholder={""}
                color="blue-gray"
                className="-mb-2"
                variant="h6"
              >
                Email
              </Typography>
              <Input
                size="lg"
                crossOrigin={""}
                type="email"
                id="email"
                {...register("email")}
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Password
              </Typography>
              <Input
                crossOrigin={""}
                type="password"
                id="password"
                {...register("password")}
                size="lg"
                placeholder="********"
                className="p-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="">
              <select
                className="p-2 border-none bg-transparent outline-0"
                {...register("role")}
              >
                <option>Select Role</option>
                <option value={"seller"}>Seller</option>
                <option value={"buyer"}>Buyer</option>
              </select>
            </div>

            <Button type="submit" placeholder={""} className="mt-6" fullWidth>
              Register
            </Button>
            <Typography
              placeholder={""}
              color="gray"
              className="mt-4 text-center font-normal"
            >
              Already have an account?
              <NavLink to="/login" className="font-medium text-gray-900">
                Login
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Register;
