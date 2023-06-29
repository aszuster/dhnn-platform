import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import {
  allCategories,
  deleteCategory,
  editCategory,
  newCategory,
} from "services/Categories"

import { categoryById } from "services/Categories"

const useCategories = () => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ["categories"],
    () => allCategories()
  )

  return { categories, isLoadingCategories }
}
const useGetCategoryById = (id) => {
  const { data: category, isLoading: isLoadingCategory } = useQuery(
    ["category", id],
    () => categoryById({ id })
  )
  return { category, isLoadingCategory }
}
const useNewCategory = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(newCategory, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Categoria agregada")
      queryClient.invalidateQueries("categories")
      queryClient.invalidateQueries({ queryKey: ["category"] })
    },
  })
}

const useEditCategory = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(editCategory, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Categoria editada")
      queryClient.invalidateQueries("categories")
    },
  })
}

const useDeleteCategory = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(deleteCategory, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Categoria eliminada")
      queryClient.invalidateQueries("categories")
    },
  })
}

export {
  useCategories,
  useGetCategoryById,
  useNewCategory,
  useEditCategory,
  useDeleteCategory,
}
