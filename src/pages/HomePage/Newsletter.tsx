import { Button, Typography, Input } from "@material-tailwind/react";

const Newsletter = () => {
  return (
      <section className="w-full bg-gray-50 py-16 px-6 flex flex-col justify-center my-20">
        <div className="w-[90%] mx-auto">
           <Typography variant="h4" className=" text-brown-500" placeholder={""}>
            Don’t Just Buy—Belong.
          </Typography>
          <Typography  className=" text-gray-500 my-3" placeholder={""}>
            Get the latest drops, DIY tips, and seller secrets. We don’t spam (unless it’s a cute footstool shaped like a can of spam — then maybe).
          </Typography>

         <div className="flex flex-col   gap-8 my-5 py-4 rounded-lg">
        <Input
          type="email"
          label="Your email"
          className="w-full sm:w-96 bg-gray-100"
          color="green"
          placeholder=""
          crossOrigin={undefined}
        />
        <Button placeholder="" className="w-full sm:w-60 h-10 py-2 bg-brown-800 text-white font-semibold">
          ✉️ Subscribe to the Vibe
        </Button>
      </div>

        </div>
    </section>
  )
}

export default Newsletter