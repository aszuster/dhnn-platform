import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { allUsers, deleteUser, editUser, newUser, userId } from "services/Users"

const area = {
  diseño: "Diseño",
  dev: "Desarrollo",
  pm: "Project Management",
  people: "People",
  managment: "Management team",
  finanzas: "Finanzas",
  it: "I.T",
}

export const useFilteredTeam = (filter) => {
  const { data, isLoading } = useQuery(["users"], () => allUsers(), {
    select: (users) =>
      users.data.filter((user) => {
        if (filter !== "Todos" && user.area === area[filter]) {
          return true
        }
        if (filter === "Todos") {
          return true
        }
      }),
  })
  return { data, isLoading }
}

export const useGetAllUsers = () => {
  const { data, isLoading, isError, error } = useQuery(["users"], () =>
    allUsers()
  )

  return { data, isLoading, isError, error }
}

export const useGetUserById = (id) => {
  const { data: user, isLoading: isLoadingUser } = useQuery(["user", id], () =>
    userId({ id })
  )
  return { user, isLoadingUser }
}

export const useNewUser = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(newUser, {
    onSuccess: () => {
      router.push("/admin/users")
      toast.success("Usuario agregado")
      queryClient.invalidateQueries("users")
    },
  })
}

export const useEditUser = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(editUser, {
    onSuccess: () => {
      router.push("/admin/users")
      toast.success("Usuario editado")
      queryClient.invalidateQueries("users")
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}

export const useDeleteUser = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(deleteUser, {
    onSuccess: () => {
      router.push("/admin/users")
      toast.success("Usuario eliminado")
      queryClient.invalidateQueries("users")
    },
  })
}
