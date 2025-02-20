import {Spinner} from "@material-tailwind/react";
import {useGetAllFurnituresDataQuery} from "../../redux/features/FurnitureManagement/furnitureApi";
import {TFurniture} from "../Products/utils/types/TFurniture";

const Types = () => {
  const {data: Furnitures, isLoading} = useGetAllFurnituresDataQuery("");
  const typeMap = new Map();

  Furnitures?.data?.forEach((item: TFurniture) => {
    const lowerCaseType = item.type.toLowerCase();
    if (!typeMap.has(lowerCaseType)) {
      typeMap.set(lowerCaseType, item.type); // Preserve original casing
    }
  });
  const uniqueTypes = Array.from(typeMap.values());
  console.log("data: ", Furnitures);
  return (
    <>
      <div className="font-grechen">
        <h1 className=" text-5xl text-brown-800 text-center font-grechen">
          Discover Your Perfect Furniture Style
        </h1>
        <p className="text-brown-900 text-center text-base my-6 w-[50%] mx-auto font-serif">
          Whether you're searching for unique furniture or looking to restore
          timeless pieces, our marketplace connects you with sellers and experts
          who bring craftsmanship to life.
        </p>
      </div>

      <div
        className="grid md:grid-cols-6 grid-cols-3 gap-3 md:w-[80%] w-[100%]  place-content-center place-items-center relative mx-auto   items-center justify-center my-20  
     "
      >
        {isLoading && <Spinner />}
        {/* {Furnitures.data[0].type} */}
        {uniqueTypes.map((type: string, index: number) => (
          <div
            key={index}
            className="rounded-full text-white bg-brown-800 p-2  text-center text-wrap w-24 h-24 hover:w-28 cursor-pointer flex items-center justify-center
          "
          >
            {type}
          </div>
        ))}
      </div>
    </>
  );
};

export default Types;
