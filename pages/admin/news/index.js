import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { allNews } from "services/News"
import { useQuery } from "@tanstack/react-query"
//Components
import NoUserImage from "components/svg/NoUserImage"
import TextButton from "components/buttons/TextButton"
import Alert from "components/alerts/alert"
import Icon from "components/svg/Icon"
import AdminDashboard from "../index"
import { View } from "components/svg/View"
import { EditIcon } from "components/svg/EditIcon"
import TableSkeleton from "components/skeletons/Admin/tables/news/TableSkeleton"

const ADMIN_LINK = process.env.NEXT_PUBLIC_ADMIN_LINK

const News = () => {
  const { data, isLoading } = useQuery(["news"], () => allNews())
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
                <th className="px-4 pb-4">Fecha</th>
                <th className="px-4 pb-4">Autor</th>
                <th className="px-4 pb-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-yellow-200" colSpan={5}>
                  <Link href={`/${ADMIN_LINK}/news/new-news`}>
                    <a className="flex w-auto text-sm items-start lg:items-center justify-center py-2 text-yellow-700 tracking-wide hover:underline hover:underline-offset-4">
                      <div className="h-6 w-6 mr-1">
                        <Icon svg="plusCircle" />
                      </div>
                      Nueva novedad
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
                      {data?.data.map((news) => {
                        return (
                          <tr
                            key={news._id}
                            className="border-t-[1px] border-grayDHNN"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="relative h-14 w-14 mr-6 rounded-full">
                                  {news.image ? (
                                    <Image
                                      className="rounded-full"
                                      src={news.image.secure_url}
                                      alt={`Foto de ${news.title}`}
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
                                  <p className="font-semibold">{news.title}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-4 capitalize">
                              <div className="flex items-center">
                                {news.date}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {news.author.userName}
                            </td>
                            <td className="px-4 py-4">
                              <button
                                className="flex flex-col justify-center items-center"
                                onClick={() => router.push(`/news/${news._id}`)}
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
                                    `/${ADMIN_LINK}/news/edit/${news._id}`
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
                          message="No hay novedades cargadas!"
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

News.auth = true

export default News
