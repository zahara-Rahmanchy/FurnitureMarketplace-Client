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
    <div className="relative z-10 my-20 mx-20 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-32 gap-x-24">
      {furnitures.map((item: TFurniture, index: number) => (
        <div
          className={` w-full flex flex-col h-[300px] items-center justify-center
         `} 
          key={index}
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-[13rem] w-full object-cover overflow-hidden "
          />
          <div className=" w-full py-2 px-2 text-center">
             <Typography placeholder={""}  className="text-brown-800 text-xl py-2 font-semibold font-grechen ">{item.name}</Typography>
            <Typography placeholder={""}  className=" text-lg text-nowrap text-gray-600">
              <span className="text-gray-700">$</span> {item.price}</Typography>
           

          </div>
          <Button
            placeholder={""}
            onClick={() => handleOpen(item)}
            variant="outlined"
            size="sm"
            className="border-0   bg-none shadow-none text-brown-700 text-sm w-full mb-1 
            rounded-none relative
            
            after:absolute 
            after:bottom-0 
            after:left-1/2 
            after:h-[2px] 
            after:w-[30px] 
            hover:text-black
            after:bg-brown-700 
            after:translate-x-[-50%]
            after:transition-all 
            after:duration-300 
            hover:after:w-full"
            
          >
            Details
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
