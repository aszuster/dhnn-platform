import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import {
  allSections,
  deleteSection,
  editSection,
  newSection,
  sectionById,
} from "services/Sections"

const useSections = () => {
  const { data: sections, isLoading: isLoadingSections } = useQuery(
    ["sections"],
    () => allSections()
  )
  return { sections, isLoadingSections }
}

const useGetSectionById = (id) => {
  const { data: section, isLoading: isLoadingSection } = useQuery(
    ["section", id],
    () => sectionById({ id })
  )
  return { section, isLoadingSection }
}

const useNewSection = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(newSection, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Seccion agregada")
      queryClient.invalidateQueries("sections")
      queryClient.invalidateQueries({ queryKey: ["section"] })
    },
  })
}

const useEditSection = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(editSection, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Seccion editada")
      queryClient.invalidateQueries("sections")
    },
  })
}

const useDeleteSection = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(deleteSection, {
    onSuccess: () => {
      router.push("/admin/operations")
      toast.success("Seccion eliminada")
      queryClient.invalidateQueries("sections")
    },
  })
}

export {
  useSections,
  useGetSectionById,
  useNewSection,
  useEditSection,
  useDeleteSection,
}
