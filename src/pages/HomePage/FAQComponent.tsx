import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export function FAQComponent() {
  const [open, setOpen] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);

  const handleAlwaysOpen = () => setAlwaysOpen(cur => !cur);
  const handleOpen = value => setOpen(open === value ? 0 : value);

  return (
    <section className="md:w-[70%] mx-auto text-brown-800 font-serif">
      <h2 className="font-grechen text-4xl text-brown-800 mt-20 mb-10">
        Frequently Asked Question!
      </h2>
      <Accordion open={alwaysOpen} placeholder={""}>
        <AccordionHeader
          className="text-brown-800 font-serif"
          placeholder={""}
          onClick={handleAlwaysOpen}
        >
          How can I sell items on the platform?
        </AccordionHeader>
        <AccordionBody className="font-serif">
          Once registered, log in to your account. Go to the "My Hub" and click
          on "Add Furniture". Fill out the item details and submit it for
          approval before it appears on the marketplace.
        </AccordionBody>
      </Accordion>
      <Accordion placeholder={""} open={open === 1}>
        <AccordionHeader
          className="text-brown-800 font-serif"
          placeholder={""}
          onClick={() => handleOpen(1)}
        >
          How do I purchase items?
        </AccordionHeader>
        <AccordionBody className="font-serif">
          Browse through the categories or use the search bar to find items.
          Once you find an item, click on it to view details, and then select
          the "Buy" button to add it to your cart. Proceed to checkout to
          complete your purchase.
        </AccordionBody>
      </Accordion>
      <Accordion placeholder={""} open={open === 2}>
        <AccordionHeader
          className="text-brown-800 font-serif"
          placeholder={""}
          onClick={() => handleOpen(2)}
        >
          How can I request furniture polishing services?
        </AccordionHeader>
        <AccordionBody className="font-serif">
          To request furniture polishing, visit the seller's profile page and
          select the "Request Service" option. Provide the details of the item
          you need polished, and the seller will get back to you with more
          information.
        </AccordionBody>
      </Accordion>
    </section>
  );
}
