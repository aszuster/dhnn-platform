import { useRouter } from "next/router"
import Image from "next/image"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newNews } from "services/News"
import { Form, Field, Formik, ErrorMessage } from "formik"
//Components
import { InputTextFormik } from "components/form/InputTextFormik"
import PrimaryButton from "components/buttons/PrimaryButton"
import promiseToast from "components/alerts/promiseToast"
import AdminDashboard from "../index"
import { uploadFiles } from "services/uploadFiles"
import TextArea from "components/form/TextArea"
import { useSession } from "next-auth/react"
import Delete from "components/svg/Delete"
import Upload from "components/svg/Upload"
import ButtonArrow from "components/buttons/ButtonArrow"

const NewNews = () => {
  const [previewSourceIcon, setPreviewSourceIcon] = useState("")
  const mutateProjects = useMutation(newNews)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: session } = useSession()

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
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    headers = {
      ...headers,
      image: previewSourceIcon,
      date: today.toDateString(),
      author: {
        userName: session?.user?.name,
        area: session?.user?.area,
        picture: session?.user?.picture.secure_url,
      },
    }
    if (headers.image) {
      const resp_file = await uploadFiles(headers.image, "news_preset")
      headers = {
        ...headers,
        image: {
          public_id: resp_file.public_id,
          secure_url: resp_file.secure_url,
        },
      }
    }
    promiseToast(
      (resolve) =>
        mutateProjects.mutate(
          { ...headers },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["news"])
              resolve()
              router.push("/admin/news")
            },
          }
        ),
      "Creando la novedad",
      "Novedad creada",
      "Error al crear el novedad"
    )
  }

  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pb-4">
          <h1 className="mb-10 text-6xl font-bold">Agregar novedad</h1>
          <Formik
            initialValues={{
              title: "",
              firstText: "",
              secondText: "",
              highlightedText: "",
              thirdText: "",
            }}
            validate={(values) => {
              const errors = {}
              if (!values.title) {
                errors.title = "Requerido"
              }
              if (!previewSourceIcon) {
                errors.image = "Imagen requerida"
              }
              console.log(errors)
              return errors
            }}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form>
                <div className="flex flex-col gap-10">
                  <div className="w-full">
                    <div className="w-full mb-6">
                      <InputTextFormik
                        name="title"
                        label="*Titulo"
                        placeholder="Titulo"
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
                        <div className="relative w-full h-60 bg-transparent image-container">
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
                            <>
                              <div className="w-full h-full flex flex-col justify-center items-center rounded-[10px] border border-dashed border-grayDHNN overflow-hidden">
                                <Upload />
                                <p className="text-sm">Subir foto</p>
                                <p className="text-xs text-[#7B7B7B]">
                                  Tamaño recomendado:
                                </p>
                              </div>
                              <p className=" text-xs text-red-500">
                                {errors.image}
                              </p>
                            </>
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
                        <Field type="checkbox" name="featured" id="featured" />
                      </label>
                    </div>
                  </div>
                </div>

                {mutateProjects.hasError && (
                  <div className="text-rojo mt-4 text-center">
                    {mutateProjects.hasError.message}
                  </div>
                )}

                <div className="flex justify-end items-center gap-6 mt-8">
                  <p className="font-semibold text-gris1 uppercase text-xs">
                    * campos obligatorios
                  </p>
                  {mutateProjects.isLoading ? (
                    <div className="w-96 text-white bg-gris3 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Enviando...
                    </div>
                  ) : (
                    <ButtonArrow
                      type="submit"
                      text="Crear novedad"
                      theme="black"
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AdminDashboard>
  )
}

export default NewNews
