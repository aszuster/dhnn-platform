import Image from "next/image"
import React, { useEffect } from "react"
import { Field } from "formik"
import EmptyImage from "components/svg/EmptyImage"
import XCircle from "components/svg/XCircle"
import Delete from "components/svg/Delete"

const FieldImage = ({ label, index, Images, setImages }) => {
  const handleImagesInputChange = (e) => {
    const file = e.target.files[0]
    previewImages(file)
  }
  const previewImages = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const updatedImages = [...Images]
      updatedImages[index]["secure_url"] = reader.result
      setImages(updatedImages)
    }
  }
  const clearImageUrl = () => {
    const clearImages = [...Images]
    clearImages[index]["secure_url"] = ""
    setImages(clearImages)
  }
  return (
    <div className="w-auto relative tracking-wide text-gris1 text-lg">
      {label}
      <label
        className="w-full  block cursor-pointer mt-2"
        htmlFor={`images_${index}`}
      >
        {!Images[index]["secure_url"] && (
          <Field
            name={`images_${index}`}
            className="hidden appearance-none w-full bg-blanco2 text-negro1 border border-gris3 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent focus:shadow-sm focus:border-azul"
            id={`images_${index}`}
            type="file"
            onChange={handleImagesInputChange}
          />
        )}
        <div className="relative w-full h-52 bg-transparent image-container">
          {Images[index]["secure_url"] ? (
            <>
              <Image
                src={Images[index]["secure_url"]}
                alt="Imagen cargada"
                layout="fill"
                objectFit="contain"
              />
              <div
                onClick={() => clearImageUrl()}
                className="delete w-full hidden h-full flex-col justify-center items-center bg-grayDHNN2 opacity-90 rounded-[10px] border border-dashed border-grayDHNN overflow-hidden"
              >
                <Delete />
                <p className="text-sm font-normal text-white">Eliminar</p>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center rounded-[10px] border border-dashed border-grayDHNN overflow-hidden">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 14V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V14"
                  stroke="#7B7B7B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.70613 8.65625L11.9488 4.41361L16.1914 8.65625"
                  stroke="#7B7B7B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9497 14.899V4.99947"
                  stroke="#7B7B7B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-normal">Subir foto</p>
              <p className="text-xs text-[#7B7B7B]">Tamaño recomendado:</p>
            </div>
          )}
        </div>
      </label>
    </div>
  )
}

export default FieldImage
