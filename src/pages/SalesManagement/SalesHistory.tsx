import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Spinner,
  Typography,
} from "@material-tailwind/react";

// import {useState} from "react";

import {useGetSalesHistoryQuery} from "../../redux/features/SalesManagement/saleApi";
import SalesTable from "./SalesTable";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setSaleQuery} from "../../redux/features/SalesManagement/saleSlice";

const SalesHistory = () => {
  const dispatch = useAppDispatch();
  const saleData = useAppSelector(state => state.sale.data);
  console.log("saleData: ", saleData);

  // to load data
  const {data: sales, isLoading} = useGetSalesHistoryQuery(saleData) || {};

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
            <div className="mb-8 flex bg-gray-50 flex-col md:flex-row  items-center justify-between gap-8">
              <div className="">
                <Typography placeholder={""} variant="h5" color="blue-gray">
                  Sales History
                </Typography>
              </div>
              <div className="gap-3 border-0 justify-start items-center  flex flex-row  sm:flex-row mt-5">
                <div className="">
                  <Menu
                    placement="right-start"
                    dismiss={{
                      itemPress: false,
                    }}
                  >
                    <MenuHandler placeholder={""}>
                      <Button placeholder={""} size="sm">
                        Filter By
                      </Button>
                    </MenuHandler>
                    <MenuList placeholder={""}>
                      <hr className="mt-5 mb-5" />
                      <div className="flex justify-between gap-6">
                        <Typography
                          placeholder={""}
                          color="black"
                          className="text-md font-semibold"
                        >
                          Daily
                        </Typography>
                        <Input
                          type="date"
                          className="w-50"
                          color="black"
                          onChange={e =>
                            dispatch(
                              setSaleQuery({data: {date: e.target.value}})
                            )
                          }
                          crossOrigin={""}
                          label="Date"
                          containerProps={{
                            className: "mb-4",
                          }}
                        />
                      </div>
                      <div className="flex justify-between gap-3">
                        <Typography
                          placeholder={""}
                          color="black"
                          className="text-md font-semibold"
                        >
                          Weekly
                        </Typography>
                        <Input
                          type="date"
                          className="w-50"
                          color="black"
                          onChange={e =>
                            dispatch(
                              setSaleQuery({data: {week: e.target.value}})
                            )
                          }
                          crossOrigin={""}
                          label="Date"
                          containerProps={{
                            className: "mb-4",
                          }}
                        />
                      </div>
                      <div className="flex justify-between gap-4">
                        <Typography
                          placeholder={""}
                          color="black"
                          className="text-md font-semibold"
                        >
                          Montly
                        </Typography>
                        <Input
                          type="month"
                          className="w-50"
                          color="black"
                          onChange={e =>
                            dispatch(
                              setSaleQuery({data: {month: e.target.value}})
                            )
                          }
                          defaultValue={""}
                          crossOrigin={""}
                          label="Month"
                          containerProps={{
                            className: "mb-4",
                          }}
                        />
                      </div>

                      <Input
                        type="number"
                        min={1999}
                        max={2050}
                        className="text-md font-semibold"
                        placeholder="2024"
                        color="black"
                        onBlur={e =>
                          dispatch(setSaleQuery({data: {year: e.target.value}}))
                        }
                        crossOrigin={""}
                        label="Yearly"
                        containerProps={{
                          className: "mb-4 font-semibold",
                        }}
                      />
                    </MenuList>
                  </Menu>
                </div>
                <Button
                  size="sm"
                  placeholder={""}
                  className="hover:bg-black hover:text-white w-32 text-xs"
                  variant="outlined"
                  onClick={() => dispatch(setSaleQuery({data: {}}))}
                >
                  Clear Filter
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row"></div>
          </CardHeader>
          <CardBody className="overflow-scroll" placeholder={""}>
            {isLoading && <Spinner className="w-10 h-10  mx-auto" />}

            {sales !== undefined && <SalesTable sales={sales} />}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SalesHistory;
