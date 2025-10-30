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
    <div className="flex flex-col bg-[#fef3e5]">
      <div className="relative w-full pb-32">
        {/* <div className="absolute inset-0 bg-brown-900 opacity-20"></div> */}
        <img
          src="/catalogue.jpg"  
          className="w-full h-[650px] object-center"
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
      <div className="">
        {Furnitures !== undefined && (
          <FurnitureCard furnitures={Furnitures.data} />
        )}
      </div>
    </div>
  );
};

export default Catalogue;
