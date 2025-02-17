/* eslint-disable @typescript-eslint/no-explicit-any */
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid";
import {
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Checkbox,
  Button,
  // DialogFooter,
  // Input,
  // DialogBody,
  // DialogHeader,
  // Dialog,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
// import {useDeleteFurnitureMutation} from "../../redux/features/FurnitureManagement/furnitureApi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  checkboxIds,
  setFurnitureData,
} from "../../redux/features/FurnitureManagement/furnitureSlice";

import {useState} from "react";
import UpdateDialog from "./UpdateDialog";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import SellProduct from "../SalesManagement/SellProduct";
import {TUser} from "../../components/layout/ProtectedRoute";
import {useCurrentToken} from "../../redux/features/auth/authSlice";
import {verifyToken} from "../../utils/verifyToken";
import {TFurniture} from "./utils/types/TFurniture";
import {useDeleteFurnitureMutation} from "../../redux/features/FurnitureManagement/furnitureApi";

// import {DocumentDuplicateIcon} from "@heroicons/react/20/outline";
const TABLE_HEAD_Seller = [
  "",
  "Name",
  "Product ID",
  "Price",
  "Quantity",
  "Dimensions",
  "Type",
  "Category",
  "Material",
  "Color",
  "Description",
  "Edit",
  "Delete",
  "Create Variant",
  "Sell Product",
];
const TABLE_HEAD_Buyer = [
  "",
  "Name",
  "Product ID",
  "Price",
  "Quantity",
  "Dimensions",
  "Type",
  "Category",
  "Material",
  "Color",
  "Description",
];
// interface TData{
//   Data:{
//     T
//   }
// }
export function FurnitureTable({furnitures}: {furnitures: any}) {
  console.log("item: ", furnitures);
  // accessibility to make changes according to role
  const token = useAppSelector(useCurrentToken);
  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  // table columns based on role
  const tableHead =
    (user as TUser)?.role === "seller" ? TABLE_HEAD_Seller : TABLE_HEAD_Buyer;
  const [open, setOpen] = useState(false);
  const [openDuplicate, setOpenDuplicate] = useState(false);
  const [saleDialog, setSaleDialog] = useState(false);
  const [selected, setSelected] = useState<TFurniture>();
  const dispatch = useAppDispatch();
  const idArray = useAppSelector(state => state.furniture.idArray);

  const handleOpen = (item: TFurniture) => {
    setOpen(cur => !cur);
    setSelected(item);
    console.log("selected: ", selected);
  };

  const handleOpenDuplicate = (item: TFurniture) => {
    setOpenDuplicate(cur => !cur);
    setSelected(item);
    console.log("selected: ", selected);
  };
  const handleSaleDialog = (item: TFurniture) => {
    setSaleDialog(cur => !cur);
    dispatch(setFurnitureData({data: item}));
  };
  const [DeleteFurniture] = useDeleteFurnitureMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        await DeleteFurniture(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleToggleDelete = (id: string) => {
    // const {value, checked} = e;
    console.log("id: ", id);
    dispatch(checkboxIds(id));
  };

  return (
    <table className="border border-blue-gray-100">
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
        {furnitures?.data.map((item: TFurniture, index: number) => {
          const isLast = index === furnitures?.data.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={item._id} className="text-center">
              <td className={classes}>
                <div className="flex flex-col items-center ">
                  {(user as TUser)?.role === "seller" && (
                    <Checkbox
                      value={item._id}
                      checked={idArray.includes(item._id)}
                      onChange={() => handleToggleDelete(item._id)}
                      crossOrigin={""}
                      className="border-green-600"
                      color={idArray.includes(item._id) ? "red" : "green"}
                    />
                  )}
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
              <td>
                <div className="flex flex-col">
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="blue-gray"
                    className="font-normal ml-2"
                  >
                    {item.productId}
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
                    color="blue-gray"
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
                  {item.dimensions}
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
                    {item.type}
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
              {/* <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.style}
                </Typography>
              </td> */}

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
              <td className={classes}>
                <Typography
                  placeholder={""}
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-wrap w-[400px] "
                >
                  <span className="w-0"> {item.description}</span>
                </Typography>
              </td>
              {(user as TUser)?.role === "seller" && (
                <td className={classes}>
                  <Tooltip content="Update">
                    <Button
                      placeholder={""}
                      onClick={() => handleOpen(item)}
                      variant="text"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </Tooltip>

                  {open && (
                    <UpdateDialog
                      buttonType={"edit"}
                      item={selected as TFurniture}
                      open={open}
                      setOpen={setOpen}
                      // handleOpen={handleOpen}
                    />
                  )}
                </td>
              )}
              {(user as TUser)?.role === "seller" && (
                <td className={classes}>
                  <Tooltip content="Delete">
                    <IconButton
                      variant="text"
                      placeholder={""}
                      onClick={() => handleDelete(item._id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              )}
              {(user as TUser)?.role === "seller" && (
                <td className={classes}>
                  <Tooltip content="Duplicate">
                    <Button
                      placeholder={""}
                      onClick={() => handleOpenDuplicate(item)}
                      variant="text"
                    >
                      <DocumentDuplicateIcon className="h-5 w-6" />
                    </Button>
                  </Tooltip>
                  {openDuplicate && (
                    <UpdateDialog
                      buttonType={"duplicate"}
                      item={selected as TFurniture}
                      open={openDuplicate}
                      setOpen={setOpenDuplicate}
                      // handleOpen={handleOpen}
                    />
                  )}
                </td>
              )}
              {(user as TUser)?.role === "seller" && (
                <td className={classes}>
                  <Tooltip content="Sell">
                    <Button
                      placeholder={""}
                      className="bg-green-400 text-white"
                      onClick={() => handleSaleDialog(item)}
                      // variant="outlined"
                    >
                      Sell
                    </Button>
                  </Tooltip>
                  {saleDialog && (
                    <SellProduct open={saleDialog} setOpen={setSaleDialog} />
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
