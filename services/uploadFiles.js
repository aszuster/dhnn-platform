const uploadFiles = async (file, preset) => {
  const data = await fetch(
    "https://api.cloudinary.com/v1_1/dfz33lwr6/image/upload",
    {
      method: "POST",
      body: JSON.stringify({
        file: file,
        upload_preset: preset,
      }),
      headers: { "Content-type": "application/json" },
    }
  ).then((response) => response.json())
  return data
}

const deleteFile = async (public_id, preset) => {
  const data = await fetch(
    "https://api.cloudinary.com/v1_1/dfz33lwr6/image/destroy/",
    {
      method: "POST",
      body: JSON.stringify({
        file: public_id,
        upload_preset: preset,
        api_key: process.env.CLOUDINARY_API_KEY,
      }),
      headers: { "Content-type": "application/json" },
    }
  ).then((response) => response.json())
  return data
}
export { uploadFiles, deleteFile }
