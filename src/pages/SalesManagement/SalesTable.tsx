/* eslint-disable @typescript-eslint/no-explicit-any */
import {Typography} from "@material-tailwind/react";
import {TSalesHistory} from "../Products/utils/types/TSalesHistory";

const TABLE_HEAD = [
  "Date of Sale",
  "Buyer Name",
  "Product Name",
  "Quantity Sold",
  "Price",
  "Brand",
];

const SalesTable = ({sales}: any) => {
  console.log("sales table: ", sales, sales.data.length);
  return (
    <table className="w-full mx-auto ">
      <thead>
        <tr>
          {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th> */}

          {TABLE_HEAD.map((head, index: number) => (
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

      <tbody className="">
        {sales.data.length === 0 && (
          <div className="text-center text-red-400 w-full flex justify-center items-center my-2 ">
            <p>No Data Found!</p>
          </div>
        )}
        {sales?.data.map((item: TSalesHistory, index: number) => {
          const isLast = index === sales?.data.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={item._id} className="text-center">
              <td>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.dateOfSale.split("-").reverse().join("-")}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.buyerName}
                </Typography>
              </td>

              <td>
                {" "}
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal ml-2"
                >
                  {item.furnitureData.name}
                </Typography>
              </td>

              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.quantity}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="green"
                    className="font-bold"
                  >
                    $ {item.furnitureData.price}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="green"
                    className="font-bold"
                  >
                    {item.furnitureData.type}
                  </Typography>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SalesTable;
