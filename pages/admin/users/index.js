import Image from "next/image"
import Link from "next/link"
import NoUserImage from "components/svg/NoUserImage"
import AdminDashboard from "../index"
import Icon from "components/svg/Icon"
import { EditIcon } from "components/svg/EditIcon"
import { useRouter } from "next/router"
import { useGetAllUsers } from "hooks/useTeam"
import TableSkeleton from "components/skeletons/Admin/tables/user/TableSkeleton"

const ADMIN_LINK = process.env.NEXT_PUBLIC_ADMIN_LINK

const USER_STATES = {
  Activo: "bg-green-200 text-green-700",
  Inactivo: "bg-red-200 text-red-700",
}

export default function Users() {
  const { data, isLoading, isError, error } = useGetAllUsers()
  const router = useRouter()
  return (
    <AdminDashboard>
      {/* TABLA */}
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="overflow-scroll lg:overflow-auto w-full border-[1px] bg-blanco1 border-grayDHNN rounded-2xl shadow-sm mb-12">
          <div className="h-4 w-full bg-gris3 rounded-t-2xl"></div>
          <table className="w-full text-left text-negro1 font-medium">
            <thead className="bg-gris3">
              <tr>
                <th className="px-8 pb-4">Nombre</th>
                <th className="px-4 pb-4">Area</th>
                <th className="px-4 pb-4">Puesto</th>
                <th className="px-4 pb-4">Estado</th>
                <th className="px-4 pb-4">Rol</th>
                <th className="px-4 pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <tr>
                    <td colSpan="5" className="text-center"></td>
                  </tr>
                  <TableSkeleton />
                </>
              ) : (
                <>
                  <tr>
                    <td className="bg-yellow-200" colSpan={6}>
                      <Link href={`/${ADMIN_LINK}/users/new`}>
                        <a className="flex w-auto text-sm items-start lg:items-center justify-center py-2 text-yellow-700 tracking-wide hover:underline hover:underline-offset-4">
                          <div className="h-6 w-6 mr-1">
                            <Icon svg="plusCircle" />
                          </div>{" "}
                          Nuevo usuario
                        </a>
                      </Link>
                    </td>
                  </tr>
                  {data.data?.map((user) => {
                    return (
                      <tr
                        key={user._id}
                        className="border-t-[1px] border-grayDHNN"
                      >
                        <td className="px-8 py-4">
                          <div className="flex items-center">
                            <div className="relative h-14 w-14 mr-6 rounded-full border-2 border-grayDHNN">
                              {user.picture?.secure_url ? (
                                <Image
                                  className="rounded-full"
                                  src={user.picture.secure_url}
                                  alt={`Foto de ${user.name}`}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full overflow-hidden">
                                  <NoUserImage />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-gris1 font-light">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p>{user.area}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p>{user.occupation}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-0 pb-[2px] text-xs rounded-xl ${
                              USER_STATES[user.state]
                            }`}
                          >
                            {user.state}
                          </span>
                        </td>
                        <td className="px-4 py-4 capitalize">{user.role}</td>
                        <td className="px-4 py-4">
                          <button
                            className="flex flex-col justify-center items-center"
                            onClick={() =>
                              router.push(
                                `/${ADMIN_LINK}/users/edit/${user._id}`
                              )
                            }
                          >
                            <EditIcon />
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboard>
  )
}

Users.auth = "admin"
