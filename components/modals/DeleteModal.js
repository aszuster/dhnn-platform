import React, { useState } from "react"

import TextButton from "components/buttons/TextButton"

export default function DeleteModal({
  visible,
  onClose,
  itemDelete,
  nameDelete,
}) {
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose()
    onClose()
  }
  if (!visible) return null
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white rounded-[10px] w-72 p-[20px]">
        <h1 className="font-semibold text-center text-xl text-gray-700 mb-[20px]">
          ¿Querés eliminar {nameDelete}?
        </h1>

        <div className="text-center grid gap-4 grid-cols-2">
          <TextButton
            text="Eliminar"
            color="white"
            action={itemDelete}
            classes={"bg-red-500 p-2 rounded-[10px]"}
            className="px-5 py-2 bg-gray-700 text-white rounded"
          />
          <TextButton
            text="Cancelar"
            color="black"
            action={handleOnClose}
            classes={"bg-white p-2 rounded-[10px]"}
            className="px-5 py-2 bg-gray-700 text-white rounded"
          />
        </div>
      </div>
    </div>
  )
}
