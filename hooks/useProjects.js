import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import {
  allProjects,
  deleteProject,
  editProject,
  newProject,
  projectId,
} from "services/Projects"
import { useContext } from "react"
import { contexto } from "components/context/ProjectsContext"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { uploadFiles } from "services/uploadFiles"
import axios from "axios"

const category = {
  medio: "Medio & OTT",
  entertainment: "Entertainment",
  insurance: "Insurance & Insurtech",
  energy: "Energy & Industrials",
  banking: "Banking & Finance",
  retail: "Retail & Commerce",
  information: "InformationTech",
}

const filterByYearOrCategory = (projects, categoryFilter, yearFilter) => {
  return projects?.filter((project) => {
    if (categoryFilter !== "" || yearFilter > 0) {
      // si alguno de los dos filtros cambiaron
      if (project.category === category[categoryFilter] && yearFilter === 0) {
        return project
      } else if (
        project.category === category[categoryFilter] &&
        yearFilter === project.year
      ) {
        return project
      } else if (categoryFilter === "" && yearFilter === project.year) {
        return project
      }
    } else {
      return projects
    }
  })
}

export function useFilteredProject(categoryFilter, yearFilter) {
  const { state } = useContext(contexto)
  const filterByState = useCallback(
    (projects) =>
      projects.data.filter((project) => {
        if (state === "All") {
          return projects
        } else if (project.state === state) {
          return project
        }
      }),
    [state]
  )

  const { data, isLoading } = useQuery(["projects"], () => allProjects(), {
    select: filterByState,
  })
  const filteredData = filterByYearOrCategory(data, categoryFilter, yearFilter)
  return { projects: filteredData, isLoading }
}

export function useProjectById(id) {
  const { data: initialProject, isLoading: isLoadingInitial } = useQuery(
    ["project", id],
    () => projectId({ id })
  )
  return { initialProject, isLoadingInitial }
}

export function useNewProject() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(newProject, {
    onSuccess: () => {
      router.push("/admin/projects")
      toast.success("Proyecto agregado")
      queryClient.invalidateQueries("projects")
    },
  })
}

export function useEditProject() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(editProject, {
    onSuccess: () => {
      router.push("/admin/projects")
      toast.success(`Proyecto editado`)
      queryClient.invalidateQueries("projects")
      queryClient.invalidateQueries({ queryKey: ["project"] })
    },
  })
}

export function useNewImages() {
  return async function newImages(headers) {
    const newImageResponse = await Promise.all(
      headers.images.map(async (item) => {
        if (item.secure_url !== "") {
          await uploadFiles(item.secure_url, "projects_preset").then((resp) => {
            item.secure_url = resp.secure_url
            item.public_id = resp.public_id
          })
        }
        return item
      })
    )
    return newImageResponse
  }
}

export function useEditImages() {
  return async function editImages(
    previewSourceIcon,
    initialProject,
    images,
    headers
  ) {
    if (previewSourceIcon) {
      const new_image = await uploadFiles(previewSourceIcon, "projects_preset")
      if (initialProject.data.project_img) {
        const prev_data_image = {
          public_id: initialProject.data.project_img.public_id,
          preset: "projects_preset",
        }
        await axios.delete("/api/files/delete", { data: prev_data_image })
      }
      headers = {
        ...headers,
        project_img: {
          public_id: new_image.public_id,
          secure_url: new_image.secure_url,
        },
      }
    }
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        //Recorro el array de las imagenes nuevas
        const oldImageSecureUrl =
          initialProject.data.images[index]["secure_url"]
        const oldImagePublicId = initialProject.data.images[index]["public_id"]
        const newImageSecureUlr = images[index].secure_url
        if (newImageSecureUlr !== oldImageSecureUrl) {
          // valido que el secure_url de la imagen vieja  sea distinto, que significaria que hay una nueva imagen
          if (oldImageSecureUrl !== "") {
            // si el secure_url de la imagen anterior no esta vacio significa que se reemplazo la imagen anterior
            const new_image = await uploadFiles(
              images[index].secure_url,
              "projects_preset"
            )
            images[index].secure_url = new_image.secure_url
            images[index].public_id = new_image.public_id
            const headers = {
              public_id: oldImagePublicId,
              preset: "projects_preset",
            }
            //elimino la imagen anterior
            await axios.delete("/api/files/delete", { data: headers })
          } else {
            // en este caso solo seria una imagen nueva para subir
            const new_image = await uploadFiles(
              images[index].secure_url,
              "projects_preset"
            )
            images[index].secure_url = new_image.secure_url
            images[index].public_id = new_image.public_id
          }
        }
      }
      headers = {
        ...headers,
        images: images,
      }
    }
    return headers
  }
}

export function useDeleteProject() {
  const router = useRouter()
  return useMutation(deleteProject, {
    onSuccess: () => {
      router.push("/admin/projects")
      toast.success(`Proyecto eliminado`)
    },
  })
}
