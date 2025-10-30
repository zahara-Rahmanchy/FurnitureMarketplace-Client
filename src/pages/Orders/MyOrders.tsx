/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Typography } from "@material-tailwind/react";
import { useGetOrderItemsQuery } from "../../redux/features/orders/orderApi";
import { Fragment } from "react";


const TABLE_HEAD = [
  "Product Name",
  "Type",
  "Price",
  "Quantity",
  "Total (Price × Qty)",
  // "Status"
];

const MyOrders = () => {
  const { data: orders } = useGetOrderItemsQuery("");
  console.log("orders: ", orders);

  return (
    <section className="w-full my-4 p-7">
       <Typography placeholder={""}  color="blue-gray" className="font-bold text-xl mb-9">
                My Orders
              </Typography>
      <table className="border border-blue-gray-100 w-[90%]">
        <thead>
          <tr>
           
        
           
            {TABLE_HEAD.map((head, idx) => (
              <th key={idx} className="border p-4 text-left">
                {head}
              </th>
            ))}

             {/* <th>Status</th> */}
          </tr>
         
        </thead>

        <tbody>
          {orders?.data?.map((order: any, orderIndex: number) => (
            <Fragment key={order._id}>
              {/* Order Summary Row */}
              <tr className="bg-gray-100">
                <td colSpan={TABLE_HEAD.length + 1} className="p-4 font-semibold font-serif">
                  Order {orderIndex + 1} — {order.buyer.username} 
                  <span className="font-normal"> : {order.buyer.email} </span> 
                 
                </td>
                 <td className="p-4 border text-left ">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </td>
              </tr>

              {/* Order Items */}
              {order.items.map((item: any) => (
              <>
                  <tr key={item._id} className="text-center">
                  
                  <td className="p-4 border">{item.product.name}</td>
                  <td className="p-4 border">{item.product.type}</td>
                  <td className="p-4 border">${item.product.price.toFixed(2)}</td>
                  <td className="p-4 border">{item.quantity}</td>
                  <td className="p-4 border">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                  
                </tr>
              
              
              </>
              ))}
               <tr className="font-bold bg-gray-50">
                <td  className="p-4 text-left" colSpan={4}>
                 <span className=" ml-14"> Order Total:</span>
                </td>
                <td className="p-4 border text-center" >
                  ${order.totalAmount.toFixed(2)}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MyOrders;
