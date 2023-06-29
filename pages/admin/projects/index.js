import React from "react"
import Link from "next/link"
import Image from "next/image"
import { allProjects } from "services/Projects"
import { useQuery } from "@tanstack/react-query"
//Components
import NoUserImage from "components/svg/NoUserImage"
import TextButton from "components/buttons/TextButton"
import Alert from "components/alerts/alert"
import Icon from "components/svg/Icon"
import AdminDashboard from "../index"
import { useRouter } from "next/router"
import { View } from "components/svg/View"
import { EditIcon } from "components/svg/EditIcon"
import TableSkeleton from "components/skeletons/Admin/tables/projects/TableSkeleton"

const ADMIN_LINK = process.env.NEXT_PUBLIC_ADMIN_LINK

const PROJECT_STATES = {
  en_curso: "bg-yellowDHNN",
  finalizados: "bg-white border-solid border-[1px] border-grayDHNN",
}
const AlertMessage = "No hay proyectos cargados!"

const NewProject = () => {
  const { data, isLoading } = useQuery(["projects"], () => allProjects())
  const test = true
  const router = useRouter()
  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="overflow-scroll lg:overflow-auto w-full border-[1px] bg-blanco1 border-grayDHNN rounded-2xl shadow-sm mb-12">
          <div className="h-4 w-full bg-gris3 rounded-t-2xl"></div>
          <table className="w-full text-left text-negro1 font-medium">
            <thead className="bg-gris3">
              <tr>
                <th className="px-8 pb-4">Titulo</th>
                <th className="px-4 pb-4">Categoria</th>
                <th className="px-4 pb-4">Estado</th>
                <th className="px-4 pb-4">Año</th>
                <th className="px-4 pb-4">Video Url</th>
                <th className="px-4 pb-4"></th>
                <th className="px-4 pb-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-yellow-200" colSpan={7}>
                  <Link href={`/${ADMIN_LINK}/projects/new-project`}>
                    <a className="flex w-auto text-sm items-start lg:items-center justify-center py-2 text-yellow-700 tracking-wide hover:underline hover:underline-offset-4">
                      <div className="h-6 w-6 mr-1">
                        <Icon svg="plusCircle" />
                      </div>
                      Nuevo proyecto
                    </a>
                  </Link>
                </td>
              </tr>
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <>
                  {data?.data.length > 0 ? (
                    <>
                      {data?.data.map((project) => {
                        return (
                          <tr
                            key={project._id}
                            className="border-t-[1px] border-grayDHNN"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="relative h-14 w-14 mr-6 rounded-full">
                                  {project.project_img ? (
                                    <Image
                                      className="rounded-full"
                                      src={project.project_img.secure_url}
                                      alt={`Foto de ${project.title}`}
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
                                  <p className="font-semibold">
                                    {project.title}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-4 capitalize">
                              <div className="flex items-center">
                                {project.category}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`px-3 py-0 pb-[2px] text-xs rounded-xs ${
                                  PROJECT_STATES[project.state]
                                }`}
                              >
                                {project.state === "en_curso"
                                  ? "En curso"
                                  : project.state}
                              </span>
                            </td>
                            <td className="px-8 py-4 capitalize">
                              <div className="flex items-center">
                                {project.year}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <Link
                                href={project.videoUrl}
                                className="line-clamp-1"
                              >
                                {project.videoUrl}
                              </Link>
                            </td>
                            <td className="px-4 py-4">
                              <button
                                className="flex flex-col justify-center items-center"
                                onClick={() =>
                                  router.push(`/proyectos/${project._id}`)
                                }
                              >
                                <View />
                                Visualizar
                              </button>
                            </td>
                            <td>
                              <button
                                className="flex flex-col justify-center items-center"
                                onClick={() =>
                                  router.push(
                                    `/${ADMIN_LINK}/projects/edit/${project._id}`
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
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <Alert
                          color="transparent"
                          showAlert={true}
                          message={AlertMessage}
                          textColor="black"
                        />
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboard>
  )
}

NewProject.auth = true

export default NewProject
