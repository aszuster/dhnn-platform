import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"
import Alert from "components/alerts/alert"
import { EditIcon } from "components/svg/EditIcon"
import Icon from "components/svg/Icon"
import { View } from "components/svg/View"
import TableSkeleton from "components/skeletons/Admin/tables/operations/TableSkeleton"

const ADMIN_LINK = process.env.NEXT_PUBLIC_ADMIN_LINK
const AlertMessage = "No hay secciones cargadas!"

const SectionsTable = ({ sections, isLoadingSections }) => {
  const router = useRouter()
  return (
    <div className="overflow-scroll lg:overflow-auto mb-12">
      <table className="text-left text-negro1 font-medium border-[1px] bg-blanco1 border-grayDHNN rounded-2xl shadow-sm">
        <thead className="bg-gris3">
          <tr>
            <th className="px-8 py-4">Titulo</th>
            <th className="px-4 py-4"></th>
            <th className="px-4 py-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-yellow-200" colSpan={4}>
              <Link href={`/${ADMIN_LINK}/operations/new_operation/${1}`}>
                <a className="flex w-auto text-sm items-start lg:items-center justify-center py-2 text-yellow-700 tracking-wide hover:underline hover:underline-offset-4">
                  <div className="h-6 w-6 mr-1">
                    <Icon svg="plusCircle" />
                  </div>
                  Nueva Seccion
                </a>
              </Link>
            </td>
          </tr>
          {isLoadingSections ? (
            <TableSkeleton />
          ) : (
            <>
              {sections?.data.length > 0 ? (
                <>
                  {sections?.data.map((section) => {
                    return (
                      <tr
                        key={section._id}
                        className="border-t-[1px] border-grayDHNN"
                      >
                        <td className="px-10 py-4" colSpan={2}>
                          <div className="flex items-center">
                            <p className="font-semibold">{section.title}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="flex flex-col justify-center items-center"
                            onClick={() =>
                              router.push(`/operaciones/section/${section._id}`)
                            }
                          >
                            <View />
                            Visualizar
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="flex flex-col justify-center items-center"
                            onClick={() =>
                              router.push(
                                `/${ADMIN_LINK}/operations/edit_operation/section/${section._id}`
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
  )
}

export default SectionsTable
