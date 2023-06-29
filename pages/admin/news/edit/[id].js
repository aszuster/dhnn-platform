import { useRouter } from "next/router"
import Image from "next/image"
import React, { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteNews, editNews, newsId } from "services/News"
import { Form, Field, Formik } from "formik"
//Components
import { InputTextFormik } from "components/form/InputTextFormik"
import promiseToast from "components/alerts/promiseToast"
import AdminDashboard from "../../index"
import { uploadFiles } from "services/uploadFiles"
import TextArea from "components/form/TextArea"
import TextButton from "components/buttons/TextButton"
import DeleteModal from "components/modals/DeleteModal"
import Delete from "components/svg/Delete"
import Upload from "components/svg/Upload"
import ButtonArrow from "components/buttons/ButtonArrow"

const EditNews = ({ id }) => {
  const [previewSourceIcon, setPreviewSourceIcon] = useState("")
  const queryClient = useQueryClient()
  const { data: initialNews, isLoading: isLoadingInitial } = useQuery(
    ["news", id],
    () => newsId({ id })
  )
  const {
    mutate: mutateEdit,
    isLoading: isLoadingEdit,
    isSuccess: isSuccessEdit,
  } = useMutation(editNews)

  const { mutate: mutateDelete } = useMutation(deleteNews)
  const router = useRouter()

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSourceIcon(reader.result)
    }
  }

  const handleSubmit = async (values) => {
    let headers = values
    headers = {
      ...headers,
      image: initialNews.data.image,
      author: initialNews.data.author,
      date: initialNews.data.date,
    }
    if (previewSourceIcon) {
      const new_image = await uploadFiles(previewSourceIcon, "news_preset")
      const prev_data_image = {
        public_id: initialNews.data.image.public_id,
        preset: "news_preset",
      }
      await axios.delete("/api/files/delete", { data: prev_data_image })
      headers = {
        ...headers,
        image: {
          public_id: new_image.public_id,
          secure_url: new_image.secure_url,
        },
      }
    }
    promiseToast(
      (resolve) =>
        mutateEdit([{ id }, { ...headers }], {
          onSuccess: () => {
            queryClient.invalidateQueries(["news_id"], id)
            queryClient.invalidateQueries(["news"])
            resolve()
            router.push("/admin/news")
          },
        }),
      "Editando la novedad",
      "Novedad Editada",
      "Error al editar la novedad"
    )
  }
  const submitDeleteNews = async () => {
    promiseToast(
      (resolve) =>
        mutateDelete(id, {
          onSuccess: () => {
            queryClient.removeQueries(["news_id", id], { exact: true })
            queryClient.invalidateQueries(["news"])
            resolve()
            router.push("/admin/news")
          },
        }),
      "Eliminando la novedad",
      "Novedad eliminada",
      "Error al eliminar la novedad"
    )
  }
  const nameDelete = "esta novedad"
  const [showModal, setShowModal] = useState(false)
  const handleOnClose = () => setShowModal(false)

  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pb-4">
          <h1 className="mb-10 text-6xl font-bold">Editar novedad</h1>
          {initialNews && (
            <Formik
              initialValues={{
                title: initialNews.data.title,
                firstText: initialNews.data.firstText,
                secondText: initialNews.data.secondText,
                highlightedText: initialNews.data.highlightedText,
                thirdText: initialNews.data.thirdText,
                featured: initialNews.data.featured,
              }}
              validate={(values) => {
                const errors = {}
                if (!values.title) {
                  errors.title = "Requerido"
                }
                return errors
              }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <div className="flex flex-col gap-10">
                    <div className="w-full">
                      <div className="w-full mb-6">
                        <InputTextFormik
                          name="title"
                          label="*Title"
                          value={values.title}
                        />
                      </div>
                      <div className="w-full relative mr-10 mb-20 mt-16 uppercase tracking-wide text-gris1 text-lg">
                        Portada
                        <label
                          className="w-full block cursor-pointer mt-2"
                          htmlFor="image"
                        >
                          <Field
                            name="image"
                            className="hidden appearance-none w-full bg-blanco2 text-negro1 border border-gris3 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent focus:shadow-sm focus:border-azul"
                            id="image"
                            type="file"
                            onChange={handleFileInputChange}
                          />
                          <div className="relative w-full h-60 bg-transparent">
                            {!previewSourceIcon &&
                              initialNews.data.image?.secure_url && (
                                <Image
                                  src={initialNews.data.image.secure_url}
                                  alt="Imagen cargada"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              )}
                            {previewSourceIcon ? (
                              <>
                                <Image
                                  src={previewSourceIcon}
                                  alt="Imagen cargada"
                                  layout="fill"
                                  objectFit="contain"
                                />
                                <div
                                  onClick={() => setPreviewSourceIcon("")}
                                  className="delete w-full hidden h-full flex-col justify-center items-center bg-grayDHNN2 opacity-90 rounded-[10px] border border-dashed border-grayDHNN overflow-hidden"
                                >
                                  <Delete />
                                  <p className="text-sm font-normal text-white">
                                    Eliminar
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full flex flex-col justify-center items-center rounded-[10px] border border-dashed border-grayDHNN overflow-hidden">
                                <Upload />
                                <p className="text-sm">Subir foto</p>
                                <p className="text-xs text-[#7B7B7B]">
                                  Tamaño recomendado:
                                </p>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                      <div className="w-full mb-32">
                        <TextArea name="firstText" label="Primer texto" />
                      </div>
                      <div className="w-full mb-32">
                        <TextArea name="secondText" label="Segundo texto" />
                      </div>
                      <div className="w-full mb-32">
                        <TextArea
                          name="highlightedText"
                          label="Texto destacado"
                        />
                      </div>
                      <div className="w-full mb-32">
                        <TextArea name="thirdText" label="Tercer texto" />
                      </div>
                      <div className="w-max">
                        <label className="flex flex-col justify-start items-start text-lg">
                          Destacada
                          <Field
                            type="checkbox"
                            name="featured"
                            id="featured"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {mutateEdit.hasError && (
                    <div className="text-rojo mt-4 text-center">
                      {mutateEdit.hasError.message}
                    </div>
                  )}

                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex-1">
                      <TextButton
                        text="Eliminar novedad"
                        color="white"
                        classes={"bg-red-500 p-2 rounded-[10px]"}
                        action={() => setShowModal(true)}
                      />
                    </div>
                    <DeleteModal
                      onClose={handleOnClose}
                      visible={showModal}
                      itemDelete={submitDeleteNews}
                      nameDelete={nameDelete}
                    />

                    <p className="font-semibold text-gris1 uppercase text-xs">
                      * campos obligatorios
                    </p>
                    {isLoadingEdit ? (
                      <div className="w-96 text-white bg-gris3 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Enviando...
                      </div>
                    ) : (
                      <ButtonArrow
                        type="submit"
                        text="Editar novedad"
                        theme="black"
                      />
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </AdminDashboard>
  )
}
EditNews.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

EditNews.auth = true
export default EditNews
