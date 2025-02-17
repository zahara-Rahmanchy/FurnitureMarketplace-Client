/* eslint-disable @typescript-eslint/no-explicit-any */
import {Typography} from "@material-tailwind/react";
import {useGetPolishRequestsQuery} from "../../redux/features/PolishManagement/polishApi";
const tableHead = [
  "Furniture Name",
  "Status",
  "Polish Type",
  "Finish Type",
  "Instructions",
  "Color",
];
const BuyerRequests = () => {
  const {data: polishRequests} = useGetPolishRequestsQuery("");
  console.log("pl: ", polishRequests);
  return (
    <div className="w-full">
      <table className="border border-blue-gray-100 w-full mx-auto">
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
                          ? "orange"
                          : "green"
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerRequests;
