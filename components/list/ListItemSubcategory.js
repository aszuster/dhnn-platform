import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useGetSubCategoryById } from "hooks/useSubCategories"
import React from "react"

const ListItemSubcategory = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })
  const { subcategory, isLoadingSubCategory } = useGetSubCategoryById(id)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      {!isLoadingSubCategory && (
        <div
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="bg-white p-4 rounded-md shadow-md my-2 text-slate-950"
        >
          <p>{subcategory.data.title}</p>
        </div>
      )}
    </>
  )
}

export default ListItemSubcategory
