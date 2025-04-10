/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import {TFurniture} from "../Products/utils/types/TFurniture";
import {useAddToCartRequestMutation} from "../../redux/features/Cart/cartApi";
// import Swal from "sweetalert2";
import {useAuth} from "../../hooks/useAuth";
import {TUser} from "../../components/layout/ProtectedRoute";

interface FurnitureDialogProps {
  open: boolean;
  handleOpen: () => void;
  furniture: TFurniture | null;
}
const FurnitureDialog: React.FC<FurnitureDialogProps> = ({
  open,
  handleOpen,
  furniture,
}) => {
  const [addToCart, {isLoading, error}] = useAddToCartRequestMutation();
  const user = useAuth();
  console.log("uer:" ,user)
  // const [disable, setDisable] = useState<boolean>(false);
  if (!furniture) return null; // Prevents errors if no furniture data
  console.log(furniture);

  const handleAddToCart = async (event: React.MouseEvent) => {
    event.preventDefault();
    // event.stopPropagation()
     if ((user as TUser)?.role === "seller") {
      alert("Please login as a buyer to add to cart!");
      return;
    }
    const cartData = {
      items: [
        {
          product: furniture._id, // product ID
          quantity: 1, // quantity to add
          seller: furniture.createdBy, // seller ID
        },
      ],
    };
    try {
      // setDisable(true);
      // Trigger the add to cart mutation
      await addToCart(cartData).unwrap();
      alert("Added To Cart");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.data.errorMessage);
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <Dialog
      placeholder={""}
      open={open}
      handler={handleOpen}
      //   className="w-[80%]"
      dismiss={{ outsidePress: false }}
      size="xl"
      animate={{
        mount: {scale: 1, y: 0},
        unmount: {scale: 0.9, y: -100},
      }}
    >
      <DialogHeader
        placeholder={""}
        className="flex justify-between text-brown-700"
      >
        {furniture.name}
        <Button
          placeholder={""}
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Close</span>
        </Button>
      </DialogHeader>
      <DialogBody placeholder={""} className="overflow-scroll h-full">
        <div className="text-brown-800 flex md:flex-row flex-col gap-2 justify-evenly items-center">
          <img src={furniture.image} alt="image" className="w-[50%] h-[80%]" />
          <div>
            <p>
              <strong className="font-semibold text-brown-700 text-md">
                Price:
              </strong>{" "}
              <span className="me-1">$</span>
              {furniture.price}
            </p>
            <p>
              <strong className="font-semibold text-brown-700 text-md">
                Category:
              </strong>{" "}
              {furniture.category}
            </p>

            <p>
              <strong className="font-semibold text-brown-700 text-md">
                Color:
              </strong>{" "}
              {furniture.color}
            </p>

            <p>
              <strong className="font-semibold text-brown-700 text-md">
                Type:
              </strong>{" "}
              {furniture.type}
            </p>
            <p>
              <strong className="font-semibold text-brown-700 text-md me-1">
                Dimensions:
              </strong>{" "}
              {furniture.dimensions}
            </p>
            <p>
              <strong className="font-semibold text-brown-700 text-md">
                Warranty:
              </strong>{" "}
              {furniture.warranty}
            </p>
          </div>
        </div>
        <p className="text-brown-700 mt-3 md:w-[85%] w-[100%] mx-auto">
          {" "}
          {furniture.description}
        </p>
        <Button
          className=" float-end mt-4 bg-brown-500 hover:bg-amber-100 hover:text-brown-900"
          size="sm"
          placeholder={""}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </Button>
      </DialogBody>
      <DialogFooter placeholder={""}>
      {error && (
          <Typography
            placeholder=""
            variant="small"
            color="red"
            className="mt-2"
          >
            Error: {(error as any)?.data?.errorMessage || "An unexpected error occurred"}
          </Typography>
        )}


      </DialogFooter>
    </Dialog>
  );
};

export default FurnitureDialog;
