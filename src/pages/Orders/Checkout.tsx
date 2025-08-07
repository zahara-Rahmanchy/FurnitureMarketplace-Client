/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardHeader,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
// import { placeOrder } from "../redux/features/order/orderSlice";
import { useForm, Controller } from "react-hook-form";
import { usePlaceOrderMutation } from "../../redux/features/orders/orderApi";
import { clearCart } from "../../redux/features/Cart/cartSlice";

type FormValues = {
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  instructions: string;
};

const CheckoutPage = () => {
  const { items } = useSelector((state: any) => state.cart);
  console.log("items from cart: ",items)
  const user = useSelector((state: any) => state.auth.user);
  const [placeOrder] = usePlaceOrderMutation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      shippingAddress: "",
      billingAddress: "",
      paymentMethod: "Cash on Delivery",
      instructions: "",
    },
  });

  const onSubmit = async(data: FormValues) => {
    const orderData = {
      buyer: user._id,
    //   items: items.map((item: any) => ({
    //     product: item._id,
    //     seller: item.sellerId || item.seller, // make sure you pass this
    //     quantity: item.quantity,
    //     instructions: data.instructions,
    //   })),
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      paymentMethod: data.paymentMethod,
    };
     try {
    const response = await placeOrder(orderData).unwrap();
    if (response.success) {
      alert("Order placed successfully!");
      dispatch(clearCart()); // Clear cart from Redux store
    } else {
      alert("Order failed. Please try again.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Something went wrong!");
  }
    
  };

  return (
    <div className="max-w-6xl mx-auto p-4 my-20">
      <Typography variant="h3" className="mb-6 mt-5 text-center font-grechen  text-brown-700" placeholder={""}>
        Checkout
      </Typography>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Form Section */}
        <Card className="shadow-md" placeholder={""}>
          <CardHeader floated={false} shadow={false} placeholder={""}>
            <Typography placeholder={""} variant="h5">Shipping & Payment Info</Typography>
          </CardHeader>
          <CardBody placeholder={""}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Controller
                name="shippingAddress"
                control={control}
                rules={{ required: "Shipping address is required" }}
                render={({ field }) => (
                  <Input {...field} label="Shipping Address" error={!!errors.shippingAddress} crossOrigin={""}/>
                )}
              />

              <Controller
                name="billingAddress"
                control={control}
                rules={{ required: "Billing address is required" }}
                render={({ field }) => (
                  <Input placeholder={""} crossOrigin={""} {...field} label="Billing Address" error={!!errors.billingAddress} />
                )}
              />

              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select label="Payment Method" {...field} placeholder={""}>
                    <Option value="Cash on Delivery">Cash on Delivery</Option>
                    <Option value="Card">Card (Coming Soon)</Option>
                  </Select>
                )}
              />

              <Controller
                name="instructions"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Additional Instructions (Optional)" />
                )}
              />

              <Button type="submit" className="mt-4 bg-brown-700" placeholder={""}>
                Confirm Order
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Right: Order Summary */}
        <Card className="bg-gray-50 shadow-md" placeholder={""}>
          <CardHeader floated={false} shadow={false} placeholder={""}>
            <Typography placeholder={""} variant="h5">Order Summary</Typography>
          </CardHeader>
          <CardBody placeholder={""}>
            {items.length === 0 ? (
              <Typography placeholder={""}>No items in cart</Typography>
            ) : (
              <>
                {items.map((item: any) => (
                  <div key={item._id} className="flex justify-between border-b py-2">
                    <Typography placeholder={""}>{item.product.name} x {item.quantity}</Typography>
                    <Typography placeholder={""}>${(item.product.price * item.quantity).toFixed(2)}</Typography>
                  </div> 
                ))}
                <div className="flex justify-between font-bold mt-4">
                  <Typography placeholder={""}>Total</Typography>
                  <Typography placeholder={""}>
                    ${items.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                  </Typography>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
