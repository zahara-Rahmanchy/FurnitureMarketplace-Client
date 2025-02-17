const images = [
  "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

  "https://images.pexels.com/photos/1173651/pexels-photo-1173651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg",
  "https://images.pexels.com/photos/1893559/pexels-photo-1893559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const Gallery = () => {
  return (
    <section className=" relative flex md:flex-row flex-col md:w-[95%] mx-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="font-grechen mb-20">
          <h1 className=" text-5xl text-brown-800 text-center font-grechen">
            Our Gallery
          </h1>
          <p className="text-brown-900 text-center text-base my-6 w-[50%] mx-auto font-serif">
            Envision your perfect space—let our gallery inspire your next
            tranformation
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg shadow-lg hover:scale-105 transition duration-300 ${
                index === 0 || index === 3 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={src}
                alt={`Furniture ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
