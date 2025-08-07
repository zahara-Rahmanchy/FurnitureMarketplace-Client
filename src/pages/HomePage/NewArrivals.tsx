
import { Spinner } from "@material-tailwind/react";
// import { useGetAllFurnituresQuery } from "../../redux/features/FurnitureManagement/furnitureApi";

import { TFurniture } from "../Products/utils/types/TFurniture";
import ProductCard from "./ProductCard";
import { useGetAllFurnituresDataQuery } from "../../redux/features/FurnitureManagement/furnitureApi";

const NewArrivals = () => {
   const {data, isLoading} = useGetAllFurnituresDataQuery("");
  const Furnitures = data?.data || []; // ✅ Extract actual array

  console.log("fu:", Furnitures); // should now print correctly

  return (
    <>
      {isLoading && (
        <span className="w-full text-center">
          <Spinner />
        </span>
      )}
      <div className="font-grechen my-7">
        <h1 className="text-5xl text-brown-800 text-center font-grechen mb-5">
          New Arrivals
        </h1>
      </div>

      <section className="mx-4 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        {Furnitures !==undefined && Furnitures.slice(0, 5).map((furniture: TFurniture, index: number) => (
           <ProductCard furniture={furniture} key={index}/>
        ))}
      </section>
    </>
  );
};

export default NewArrivals;
