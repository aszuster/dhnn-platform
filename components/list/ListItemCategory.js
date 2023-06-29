import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useGetCategoryById } from "hooks/useCategories"
import { useGetSubCategoryById } from "hooks/useSubCategories"
import React from "react"

const ListItemCategory = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })
  const { category, isLoadingCategory } = useGetCategoryById(id)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <>
      {!isLoadingCategory && (
        <div
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="bg-white p-4 rounded-md shadow-md my-2 text-slate-950"
        >
          <p>{category.data.title}</p>
        </div>
      )}
    </>
  )
}

export default ListItemCategory
