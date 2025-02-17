import {Spinner} from "@material-tailwind/react";
import {
  useGetAllFurnituresDataQuery,
  // useGetAllFurnituresQuery,
} from "../../redux/features/FurnitureManagement/furnitureApi";
import FurnitureCard from "./FurnitureCard";
import SearchFilter from "../../components/utility/SearchFilter";
import {useAppSelector} from "../../redux/hooks";

const Catalogue = () => {
  const FilterOptions = useAppSelector(state => state.furniture.filters);
  const {data: Furnitures, isLoading} =
    useGetAllFurnituresDataQuery(FilterOptions) || {};
  console.log("data chec: ", Furnitures);
  return (
    <div className="flex flex-col ">
      <div className="relative h-fit w-full mb-32">
        <div className="absolute inset-0 bg-brown-900 opacity-20"></div>
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-[500px] object-bottom"
        />
      </div>

      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <h1 className="italic text-5xl  text-brown-700 text-center font-grechen">
        Curate Your Perfect Space
      </h1>
      <span className="text-lg italic text-brown-800 text-center font-serif my-4">
        to give a premium feel.
      </span>
      <SearchFilter />
      <div className="mb-10">
        {Furnitures !== undefined && (
          <FurnitureCard furnitures={Furnitures.data} />
        )}
      </div>
    </div>
  );
};

export default Catalogue;
