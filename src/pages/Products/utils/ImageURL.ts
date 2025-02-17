const imageHostingToken = import.meta.env.VITE_IMAGE_KEY;
const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageURL = async (formData: any) => {
  try {
    const response = await fetch(imageHostingURL, {
      method: "POST",
      body: formData,
    });
    const imgRes = await response.json();
    if (imgRes.success) {
      const image = imgRes.data.display_url;
      return image;
    }

    // console.log("image: ", image);
  } catch (err) {
    console.log(err);
  }
};

export default ImageURL;
