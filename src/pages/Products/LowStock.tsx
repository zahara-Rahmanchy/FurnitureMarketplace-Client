import {Avatar, Typography} from "@material-tailwind/react";
import {useGetAllFurnituresMenuQuery} from "../../redux/features/FurnitureManagement/furnitureApi";
import {TFurniture} from "./utils/types/TFurniture";

const TABLE_HEAD = [
  "",
  "Name",
  "Price",
  "Quantity",
  "Type",
  "Material",
  "Warranty",
  "Category",
  "Description",
  "Color",
];
const LowStock = () => {
  const {data: furnitures} = useGetAllFurnituresMenuQuery("");
  return (
    <div className=" overflow-x-scroll w-[95%] mx-auto flex justify-center flex-col">
      <h3 className="text-red-400 my-16 text-2xl font-semibold  w-full mx-auto">
        Products Low In Stock
      </h3>
      <table className="border border-blue-gray-100 ">
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

        <tbody className="mx-auto w-full">
          {furnitures?.data.map((item: TFurniture, index: number) => {
            const isLast = index === furnitures?.data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              item.quantity <= 10 && (
                <tr key={item._id} className="text-center">
                  <>
                    {" "}
                    <td className={classes}>
                      <div className="flex flex-col items-center ">
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          size="sm"
                          placeholder={undefined}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal ml-2"
                        >
                          {item.name}
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
                          $ {item.price}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="red"
                          className="font-normal"
                        >
                          {item.quantity}
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
                        {item.type}
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
                          {item.dimensions}
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
                        {item.category}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue"
                        className="font-normal"
                      >
                        {item.material}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.warranty}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.description}
                      </Typography>
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
                  </>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LowStock;
