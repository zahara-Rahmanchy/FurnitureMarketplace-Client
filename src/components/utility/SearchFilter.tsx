import {useState} from "react";

import {
  ClearFilter,
  setFilterOptions,
} from "../../redux/features/FurnitureManagement/furnitureSlice";
import {useAppDispatch} from "../../redux/hooks";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {ChevronUpIcon} from "@heroicons/react/16/solid";
import {useGetAllFurnituresMenuQuery} from "../../redux/features/FurnitureManagement/furnitureApi";
import {TFurniture} from "../../pages/Products/utils/types/TFurniture";
const SearchFilter = () => {
  const [selectedOption, setSelectedOption] = useState("name");
  const {data: MenuData} = useGetAllFurnituresMenuQuery("");
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [openThirdMenu, setOpenThirdMenu] = useState(false);
  const [openFourthMenu, setOpenFourthMenu] = useState(false);

  // query params
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOption = (e: any) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    console.log("option: ", selectedOption);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchChange = (e: any) => {
    console.log("search: ", e);
    dispatch(setFilterOptions({[selectedOption]: e.target.value}));
  };
  return (
    <div className="mt-20 md:w-[90%] w-[100%] flex flex-col md:flex-row justify-between mx-auto  items-center">
      <div className=" border-b-2 justify-start items-center  flex flex-row  sm:flex-row ">
        {/* <div className=""> */}
        <select
          className="text-brown-800 p-2 border-none bg-transparent outline-0  w-20 text-sm font-serif cursor-pointer"
          onChange={handleOption}
        >
          <option value={""}>Select</option>
          <option value={"name"}>Name</option>
          <option value={"category"}>Category(e.g. Living Room)</option>
          <option value={"type"}>Type (e.g.sofa,table)</option>
          <option value={"warranty"}>Warranty (e.g.4 years)</option>
        </select>
        {/* </div> */}
        <input
          className={` border-0 outline-0 text-center placeholder:text-right placeholder:text-brown-800 placeholder:my-1 placeholder:text-3xl `}
          type="text"
          onChange={handleSearchChange}
          placeholder="&#x2315;"
        />
      </div>
      <div className="flex items-center justify-between gap-4 flex-row mt-7 md:mt-0 text-center">
        <Button
          size="sm"
          placeholder={""}
          className="hover:bg-black hover:text-white rounded-full border-brown-500  text-xs order-3"
          variant="outlined"
          onClick={() => dispatch(ClearFilter())}
          // onClick={handleClear}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Button>
        <Menu placement="right-start">
          <MenuHandler>
            <Button
              variant="text"
              size="sm"
              placeholder={""}
              className="flex flex-col justify-center  bg-transparent text-brown-800"
            >
              Filter By
            </Button>
          </MenuHandler>
          <MenuList placeholder={""}>
            <Menu
              placement="right-start"
              open={openMenu}
              handler={setOpenMenu}
              allowHover
              offset={15}
            >
              {/* <Input
                type="date"
                className="w-50"
                color="black"
                // onChange={e => setDate(e.target.value)}
                onChange={e =>
                  dispatch(setFilterOptions({releaseDate: e.target.value}))
                }
                crossOrigin={""}
                label="Release Date"
                containerProps={{
                  className: "my-4",
                }} */}
              {/* /> */}
              <MenuHandler className="flex items-center justify-between ">
                <MenuItem placeholder={""}>
                  Type
                  <ChevronUpIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      openMenu ? "rotate-90" : ""
                    }`}
                  />
                </MenuItem>
              </MenuHandler>

              <MenuList placeholder={undefined}>
                <MenuItem
                  onClick={() => dispatch(setFilterOptions({size: ""}))}
                  placeholder={undefined}
                  className="text-center"
                >
                  All
                </MenuItem>
                {MenuData !== undefined &&
                  [
                    ...new Set(
                      MenuData.data.map((item: TFurniture) => item.type)
                    ),
                  ].map((type, index) => (
                    <MenuItem
                      // onClick={() => setSize(size as string)}
                      onClick={() => dispatch(setFilterOptions({type: type}))}
                      className="text-center"
                      placeholder={undefined}
                      key={index}
                    >
                      {type as string}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>

            <Menu
              placement="right-start"
              open={openSecondMenu}
              handler={setOpenSecondMenu}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem placeholder={""}>
                  Category
                  <ChevronUpIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      openSecondMenu ? "rotate-90" : ""
                    }`}
                  />
                </MenuItem>
              </MenuHandler>
              <MenuList placeholder={""}>
                <MenuItem
                  onClick={() => dispatch(setFilterOptions({style: ""}))}
                  placeholder={undefined}
                  className="text-center"
                >
                  All
                </MenuItem>
                {MenuData !== undefined &&
                  [
                    ...new Set(
                      MenuData.data.map((item: TFurniture) => item.category)
                    ),
                  ].map((category, index) => (
                    <MenuItem
                      // onClick={() => setStyle(style as string)}
                      onClick={() =>
                        dispatch(setFilterOptions({category: category}))
                      }
                      className="text-center"
                      placeholder={undefined}
                      key={index}
                    >
                      {category as string}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <Menu
              placement="right-start"
              open={openThirdMenu}
              handler={setOpenThirdMenu}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem placeholder={""}>
                  Color
                  <ChevronUpIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      openThirdMenu ? "rotate-90" : ""
                    }`}
                  />
                </MenuItem>
              </MenuHandler>

              <MenuList placeholder={""}>
                <MenuItem
                  onClick={() => dispatch(setFilterOptions({color: ""}))}
                  placeholder={undefined}
                  className="text-center"
                >
                  All
                </MenuItem>
                {MenuData !== undefined &&
                  [
                    ...new Set(
                      MenuData.data.map((item: TFurniture) => item.color)
                    ),
                  ].map((color, index) => (
                    <MenuItem
                      onClick={() => dispatch(setFilterOptions({color: color}))}
                      className="text-center"
                      placeholder={undefined}
                      key={index}
                    >
                      {color as string}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <Menu
              placement="right-start"
              open={openFourthMenu}
              handler={setOpenFourthMenu}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem placeholder={""}>
                  Material
                  <ChevronUpIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      openFourthMenu ? "rotate-90" : ""
                    }`}
                  />
                </MenuItem>
              </MenuHandler>

              <MenuList placeholder={""}>
                <MenuItem
                  onClick={() => dispatch(setFilterOptions({material: ""}))}
                  placeholder={undefined}
                  className="text-center"
                >
                  All
                </MenuItem>
                {MenuData !== undefined &&
                  [
                    ...new Set(
                      MenuData.data.map((item: TFurniture) => item.material)
                    ),
                  ].map((material, index) => (
                    <MenuItem
                      onClick={() =>
                        dispatch(setFilterOptions({material: material}))
                      }
                      className="text-center"
                      placeholder={undefined}
                      key={index}
                    >
                      {material as string}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </MenuList>
        </Menu>
        <Menu
          placement="right-start"
          dismiss={{
            itemPress: false,
          }}
        >
          <MenuHandler placeholder={""}>
            <Button
              size="sm"
              placeholder={""}
              variant="text"
              className="bg-transparent text-brown-800"
            >
              Price Range
            </Button>
          </MenuHandler>
          <MenuList placeholder={""}>
            <Input
              type="number"
              onChange={e => setMinPrice(Number(e.target.value))}
              crossOrigin={""}
              label="Minimum Price"
              containerProps={{
                className: "mb-4",
              }}
            />

            <Input
              type="number"
              onChange={e => setMaxPrice(Number(e.target.value))}
              crossOrigin={""}
              label="Maximum Price"
              containerProps={{
                className: "mb-4",
              }}
            />

            <Button
              placeholder={""}
              size="sm"
              className="m-3"
              onClick={() =>
                dispatch(
                  setFilterOptions({
                    minPrice: minPrice as number,
                    maxPrice: maxPrice as number,
                  })
                )
              }
              // onClick={() =>
              //   setSendPrice({
              //     minPrice: minPrice as number,
              //     maxPrice: maxPrice as number,
              //   })
              // }
            >
              Apply
            </Button>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default SearchFilter;
