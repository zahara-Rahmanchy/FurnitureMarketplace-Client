import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {TFurniture} from "../Products/utils/types/TFurniture";
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
  if (!furniture) return null; // Prevents errors if no furniture data

  const addToCart = (name: string) => {
    const userConfirmed = window.confirm(
      `Do you want to buy ${name}? You cannot revert from this!`
    );
    if (userConfirmed) {
      alert(`${name} has been bought successfully!`);
    }
  };

  return (
    <Dialog
      placeholder={""}
      open={open}
      handler={handleOpen}
      //   className="w-[80%]"
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
      </DialogBody>
      <DialogFooter placeholder={""}>
        <Button
          className=" bg-brown-500 hover:bg-amber-100 hover:text-brown-900"
          placeholder={""}
          onClick={() => addToCart(furniture.name as string)}
        >
          Buy
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FurnitureDialog;
