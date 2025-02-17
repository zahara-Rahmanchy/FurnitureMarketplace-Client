/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useBulkDeleteFurnitureMutation,
  useGetAllFurnituresMenuQuery,
  useGetAllFurnituresQuery,
} from "../../redux/features/FurnitureManagement/furnitureApi";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,

  //   Tabs,
  //   TabsHeader,
  Typography,
} from "@material-tailwind/react";
// import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
// import {FurnitureCard} from "./FurnitureCard";
import {useState} from "react";
import {ChevronUpIcon} from "@heroicons/react/24/solid";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

import {TFurniture} from "./utils/types/TFurniture";
import Swal from "sweetalert2";
import {
  ClearFilter,
  setFilterOptions,
} from "../../redux/features/FurnitureManagement/furnitureSlice";
import {useCurrentToken} from "../../redux/features/auth/authSlice";
import {verifyToken} from "../../utils/verifyToken";
import {TUser} from "../../components/layout/ProtectedRoute";
import {FurnitureTable} from "./FurnitureTable";

const AllProducts = () => {
  // accessibility to make changes according to role
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  // fetching  to show in the filter menu
  const {data: MenuData} = useGetAllFurnituresMenuQuery("");
  const dispatch = useAppDispatch();
  // menu list
  const [openMenu, setOpenMenu] = useState(false);
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [openThirdMenu, setOpenThirdMenu] = useState(false);
  const [openFourthMenu, setOpenFourthMenu] = useState(false);

  // query params
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const [selectedOption, setSelectedOption] = useState("name");

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

  // getting the options
  const FilterOptions = useAppSelector(state => state.furniture.filters);

  // to load data
  const {data: Furnitures, isLoading} =
    useGetAllFurnituresQuery(FilterOptions) || {};

  // for bulk delete
  const {idArray} = useAppSelector(state => state.furniture);

  const [BulkDeleteFurniture] = useBulkDeleteFurnitureMutation();
  console.log("idArray: ", idArray);

  const handleBulkDelete = async () => {
    try {
      if (idArray.length === 0) {
        return alert("Select products using checkbox to delete");
      }
      Swal.fire({
        title: "Are you sure you want to bulk delete all of them?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async result => {
        if (result.isConfirmed) {
          const result = await BulkDeleteFurniture(idArray).unwrap();
          if (result.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (err: any) {
      Swal.fire(String(err.data.errorMessage));
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <div className="my-5 w-full mx-auto">
      <div>
        <Card
          placeholder={""}
          className="h-full w-full bg-transparent rounded-none"
          shadow={false}
        >
          <CardHeader
            placeholder={""}
            floated={false}
            shadow={false}
            className="bg-gray-50 rounded-none"
          >
            <div className="mb-8 flex md:flex-row flex-col bg-gray-50  items-center justify-between gap-8">
              <div>
                {" "}
                <Typography placeholder={""} variant="h5" color="blue-gray">
                  Furnitures list
                </Typography>
                <Typography
                  placeholder={""}
                  color="gray"
                  className="mt-1 font-normal"
                >
                  See information about all Furnitures in stock
                </Typography>
              </div>
              <div className=" border-4 rounded-full justify-start items-center  flex flex-row  sm:flex-row mt-5">
                <div className="">
                  <select
                    className="p-2 border-none bg-transparent outline-0"
                    onChange={handleOption}
                  >
                    <option value={"name"}>Select</option>
                    <option value={"name"}>Name</option>
                    <option value={"brand"}>Brand</option>
                    <option value={"model"}>Model</option>
                  </select>
                </div>
                <input
                  className={`rounded-full text-center`}
                  type="text"
                  // disabled={selectedOption === ""}
                  // value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="w-[95%] mx-auto flex  items-center justify-between gap-4 flex-row text-center">
              <Button
                size="sm"
                placeholder={""}
                className="hover:bg-black hover:text-white w-32 text-xs"
                variant="outlined"
                onClick={() => dispatch(ClearFilter())}
                // onClick={handleClear}
              >
                Clear Filter
              </Button>
              <Menu placement="right-start">
                <MenuHandler>
                  <Button
                    size="sm"
                    placeholder={""}
                    className="flex flex-col justify-center"
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
                    <Input
                      type="date"
                      className="w-50"
                      color="black"
                      // onChange={e => setDate(e.target.value)}
                      onChange={e =>
                        dispatch(
                          setFilterOptions({releaseDate: e.target.value})
                        )
                      }
                      crossOrigin={""}
                      label="Release Date"
                      containerProps={{
                        className: "my-4",
                      }}
                    />
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
                            onClick={() =>
                              dispatch(setFilterOptions({type: type}))
                            }
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
                            MenuData.data.map(
                              (item: TFurniture) => item.category
                            )
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
                            onClick={() =>
                              dispatch(setFilterOptions({color: color}))
                            }
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
                        onClick={() =>
                          dispatch(setFilterOptions({material: ""}))
                        }
                        placeholder={undefined}
                        className="text-center"
                      >
                        All
                      </MenuItem>
                      {MenuData !== undefined &&
                        [
                          ...new Set(
                            MenuData.data.map(
                              (item: TFurniture) => item.material
                            )
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
                  <Button size="sm" placeholder={""}>
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
              {(user as TUser)?.role === "seller" && (
                <Button
                  size="sm"
                  className=" bg-red-800"
                  onClick={handleBulkDelete}
                  placeholder={""}
                >
                  Bulk Delete
                </Button>
              )}
            </div>
          </CardHeader>
          <CardBody
            className="overflow-scroll px-0 w-[95%] mx-auto "
            placeholder={""}
          >
            {isLoading && <div>Loading ...</div>}

            {Furnitures !== undefined && (
              <FurnitureTable furnitures={Furnitures} />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AllProducts;
