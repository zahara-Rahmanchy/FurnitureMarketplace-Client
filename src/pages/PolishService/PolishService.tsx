/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Typography} from "@material-tailwind/react";
import {
  useGetAllPolishRequestsQuery,
  useUpdateStatusMutation,
} from "../../redux/features/PolishManagement/polishApi";
import Swal from "sweetalert2";
const tableHead = [
  "Furniture Name",
  "Polish Type",
  "Finish Type",
  "Wood Type",
  "Color",
  "Status",
  "Instructions",
  "Action",
  "",
];
const PolishService = () => {
  const {data: polishRequests} = useGetAllPolishRequestsQuery("");
  console.log("poo", polishRequests);

  const [UpdateStatus] = useUpdateStatusMutation();
  const handleAccept = async (_id: string) => {
    const sendData = {
      _id,
      status: "in-progress",
    };
    console.log(sendData);
    try {
      //   await UpdatePolishStatus(sendData).unwrap();
      await UpdateStatus(sendData).unwrap();
      alert("Polish Request Accepted Successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire(String(err.data.errorMessage));
      console.error("Failed to accept request: ", err);
    }
  };
  const handleComplete = async (_id: string) => {
    const sendData = {
      _id,
      status: "completed",
    };
    console.log(sendData);
    try {
      //   await UpdatePolishStatus(sendData).unwrap();
      await UpdateStatus(sendData).unwrap();
      alert("Polish Request Accepted Successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire(String(err.data.errorMessage));
      console.error("Failed to accept request: ", err);
    }
  };
  return (
    <div>
      {" "}
      <Typography
        placeholder={""}
        variant="h4"
        color="black"
        className="text-center my-8 "
      >
        Polish Service Requests
      </Typography>
      <table className="border border-blue-gray-100 w-[90%] mx-auto">
        <thead>
          <tr>
            {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th> */}

            {tableHead.map((head, index: number) => (
              <th
                key={index}
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

        <tbody className="mx-auto w-full">
          {polishRequests?.data.map((item: any, index: number) => {
            const isLast = index === polishRequests?.data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={item._id} className="text-center">
                <td>
                  <div className="flex flex-col">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal ml-2"
                    >
                      {item.furnitureName}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color={
                        item.status === "pending"
                          ? "red"
                          : item.status === "in-progress"
                          ? "green"
                          : "blue"
                      }
                      className="font-medium capitalize text-sm"
                    >
                      {item.status}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.shineLevel}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.polishType}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {item.instructions}
                    </Typography>
                  </div>
                </td>

                <td className={classes}>
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.color}
                  </Typography>
                </td>
                <td className={`${classes}`}>
                  {/* <button size="sm"> Accept Request</button> */}
                  <Button
                    type="submit"
                    placeholder={""}
                    size="sm"
                    className=" bg-green-400 h-8 text-xs "
                    onClick={() => handleAccept(item._id)}
                    fullWidth
                    disabled={
                      item.status === "in-progress" ||
                      item.status === "completed"
                    }
                  >
                    Accept
                  </Button>
                </td>
                <td className={`${classes}`}>
                  <Button
                    type="submit"
                    placeholder={""}
                    size="sm"
                    className=" bg-blue-400"
                    fullWidth
                    disabled={item.status === "completed"}
                    onClick={() => handleComplete(item._id)}
                  >
                    Complete
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PolishService;
