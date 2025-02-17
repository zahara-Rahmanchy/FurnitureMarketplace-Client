/* eslint-disable @typescript-eslint/no-explicit-any */

import {useState} from "react";
import {TFurniture} from "../Products/utils/types/TFurniture";
import {Button} from "@material-tailwind/react";
import FurnitureDialog from "./FurnitureDialog";

const FurnitureCard = ({furnitures}: {furnitures: any}) => {
  const [selectedFurniture, setSelectedFurniture] = useState<TFurniture | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleOpen = (furniture: TFurniture) => {
    setSelectedFurniture(furniture); // Set the clicked furniture item
    setOpen(true); // Open the dialog
  };
  return (
    <div className="relative z-10 my-10 mx-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 ">
      {furnitures.map((item: TFurniture, index: number) => (
        <div
          className="bg-brown-700 flex flex-col h-[300px] items-center justify-center"
          key={index}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[200px] object-contain h-[200px]"
          />
          <h4 className=" text-amber-100">$ {item.price}</h4>
          <h1 className="text-white font-semibold mb-1">{item.name}</h1>

          <Button
            placeholder={""}
            onClick={() => handleOpen(item)}
            variant="outlined"
            size="sm"
            className="border-2 bg-amber-100 text-brown-900 text-xs w-full mb-1 rounded-none hover:bg-white "
          >
            View Details
          </Button>
          {selectedFurniture && (
            <FurnitureDialog
              open={open}
              handleOpen={() => setOpen(false)} // Close the dialog properly
              furniture={selectedFurniture}
            />
          )}
          {/* Dialog for displaying furniture details */}
          {/* <FurnitureDialog
            open={open}
            handleOpen={handleOpen}
            furniture={item}
          /> */}
        </div>
      ))}
    </div>
  );
};

export default FurnitureCard;
