
import {
  Card,
 
 
  Typography,
} from "@material-tailwind/react";
// import Tooltip from "@material-tailwind/react/theme/components/tooltip";
import { TFurniture } from '../Products/utils/types/TFurniture';
const ProductCard = ({furniture}:{furniture:TFurniture}) => {
    console.log("prdu: ",furniture)
  return (
     <Card className=""  placeholder={""}>
            {/* <CardHeader floated={false} className=" shadow-none" placeholder={""}> */}
              <img src={furniture?.image} alt={furniture?.name} className='h-48 w-60' />
               <Typography
                variant="h6"
                color="blue-gray"
                className="my-5 text-center"
                placeholder={""}
              >
                {furniture?.name}
              </Typography>
            {/* </CardHeader> */}
           
           
          </Card>
  )
}

export default ProductCard