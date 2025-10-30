/* eslint-disable @typescript-eslint/no-explicit-any */

import {useState} from "react";
import {TFurniture} from "../Products/utils/types/TFurniture";
import {Button, Typography} from "@material-tailwind/react";
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
    <div className="relative z-10 my-20 mx-20 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 ">
      {furnitures.map((item: TFurniture, index: number) => (
        <div
          className="bg-brown-700 w-full flex flex-col h-[300px] items-center justify-center "
          key={index}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-[13rem] w-full object-cover overflow-hidden "
          />
          <div className="flex justify-between items-center w-full py-4 px-2">
             <Typography placeholder={""}  className="text-white font-semibold">{item.name}</Typography>
            <Typography placeholder={""}  className=" text-lg text-nowrap text-amber-100">$ {item.price}</Typography>
           

          </div>
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
