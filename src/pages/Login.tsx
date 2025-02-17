import {Card, Input, Button, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {useLoginMutation} from "../redux/features/auth/authApi";
import {useAppDispatch} from "../redux/hooks";
import {verifyToken} from "../utils/verifyToken";
import {setUser} from "../redux/features/auth/authSlice";
import {NavLink, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
// "username":"zahara123",
//     "password": "123456"
const Login = () => {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const [login, {error}] = useLoginMutation();
  const dispatch = useAppDispatch();
  //   console.log("data: ", data);
  console.log("error: ", error);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken);
      console.log(user);
      dispatch(setUser({user: user, token: res.data.accessToken}));
      navigate("/all-products");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire(err?.data?.errorMessage);
    }
  };
  return (
    <>
      {" "}
      <div>
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
            Login
          </Typography>
          <Typography
            placeholder={""}
            color="gray"
            className="mt-1 font-normal text-center"
          >
            Please Login To Access Your Data.
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
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button type="submit" placeholder={""} className="mt-6" fullWidth>
              Login
            </Button>
            <Typography
              placeholder={""}
              color="gray"
              className="mt-4 text-center font-normal"
            >
              Don't have an account?{" "}
              <NavLink to="/register" className="font-medium text-gray-900">
                Register
              </NavLink>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
