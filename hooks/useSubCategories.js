import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import {
  allSubCategories,
  deleteSubCategory,
  editSubCategory,
  newSubCategory,
  subcategoryById,
} from "services/Subcategories"

const useGetAllSubCategories = () => {
  const { data: subCategories, isLoading: isLoadingSubCategories } = useQuery(
    ["subcategories"],
    () => allSubCategories()
  )
  return { subCategories, isLoadingSubCategories }
}

const useGetSubCategoryById = (id) => {
  const { data: subcategory, isLoading: isLoadingSubCategory } = useQuery(
    ["subcategory", id],
    () => subcategoryById({ id })
  )
  return { subcategory, isLoadingSubCategory }
}

const useNewSubCategory = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(newSubCategory, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Sub-categoria agregada")
      queryClient.invalidateQueries("subcategories")
      queryClient.invalidateQueries({ queryKey: ["subcategory"] })
    },
  })
}

const useEditSubCategory = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(editSubCategory, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Sub-categoria editada")
      queryClient.invalidateQueries("subcategories")
    },
  })
}

const useDeleteSubCategory = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(deleteSubCategory, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Sub-categoria eliminada")
      queryClient.invalidateQueries("subcategories")
    },
  })
}

export {
  useGetAllSubCategories,
  useGetSubCategoryById,
  useNewSubCategory,
  useEditSubCategory,
  useDeleteSubCategory,
}
