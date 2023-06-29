import Image from "next/image"
import React, { useState } from "react"
import { useNewImages, useNewProject } from "hooks/useProjects"
import { uploadFiles } from "services/uploadFiles"
import { Form, Field, Formik } from "formik"
//Components
import { InputTextFormik } from "components/form/InputTextFormik"
import FieldImage from "components/form/FieldImage"
import AdminDashboard from "../index"
import TextEditor from "components/textEditor/textEditor"
import Dropdown from "components/form/Dropdown"
import Upload from "components/svg/Upload"
import Delete from "components/svg/Delete"
import ButtonArrow from "components/buttons/ButtonArrow"
import { initialImages } from "data/initialImagesProject"

const NewProject = () => {
  const [previewSourceIcon, setPreviewSourceIcon] = useState("")
  const [DropdownState, setDropdownState] = useState("")
  const [DropdownCategory, setDropdownCategory] = useState("")
  const [images, setImages] = useState(initialImages)
  const { mutate, isLoading, isError } = useNewProject()
  const newImages = useNewImages()

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }
  const previewFile = (file) => {
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSourceIcon(reader.result)
      }
    }
  }

  const handleSubmit = async (values) => {
    let headers = values
    headers = {
      ...headers,
      state: DropdownState,
      category: DropdownCategory,
      images: images,
      project_img: previewSourceIcon,
    }
    if (headers.project_img) {
      const resp_file = await uploadFiles(
        headers.project_img,
        "projects_preset"
      )
      headers = {
        ...headers,
        project_img: {
          public_id: resp_file.public_id,
          secure_url: resp_file.secure_url,
        },
      }
    }
    const updatedImages = await newImages(headers)
    headers = {
      ...headers,
      images: updatedImages,
    }
    mutate(headers)
    setImages(initialImages)
  }

  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pb-4">
          <h1 className="mb-10 text-4xl lg:text-6xl font-bold">
            Agregar proyecto nuevo
          </h1>
          <Formik
            initialValues={{
              title: "",
              videoUrl: "",
              year: new Date().getFullYear(),
              team: "",
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
            <Form>
              <div className="flex flex-col gap-10">
                <div className="w-full">
                  <div className="grid sm:grid-cols-2 gap-6 gap-x-10">
                    <div className="w-full mb-6">
                      <InputTextFormik
                        name="title"
                        label="*Título"
                        placeholder="Título"
                      />
                    </div>
                    <div className="w-full mb-9 lg:mb-6">
                      <Dropdown
                        label="Estado"
                        options={[
                          { label: "En curso", value: "en_curso" },
                          { label: "Finalizados", value: "finalizados" },
                        ]}
                        setValue={setDropdownState}
                        value={DropdownState}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 gap-x-10">
                    <div className="w-full mb-2 lg:mb-6">
                      <InputTextFormik
                        name="videoUrl"
                        label="Video Url"
                        placeholder="Video Url"
                      />
                    </div>
                    <div className="w-full mb-6">
                      <Dropdown
                        label="Categoria"
                        options={[
                          { label: "Medio & OTT", value: "Medio & OTT" },
                          { label: "Entertainment", value: "Entertainment" },
                          {
                            label: "Insurance & Insurtech",
                            value: "Insurance & Insurtech",
                          },
                          {
                            label: "Energy & Industrials",
                            value: "Energy & Industrials",
                          },
                          {
                            label: "Banking & Finance",
                            value: "Banking & Finance",
                          },
                          {
                            label: "Retail & Commerce",
                            value: "Retail & Commerce",
                          },
                          {
                            label: "InformationTech",
                            value: "InformationTech",
                          },
                        ]}
                        setValue={setDropdownCategory}
                        value={DropdownCategory}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block tracking-wide text-[#212121] text-sm mb-2"
                      htmlFor="year"
                    >
                      Año
                    </label>
                    <Field
                      className="appearance-none block w-full bg-blanco2 text-[40px] text-negro1 border-b border-grayDHNN2 py-2 px-4 mb-3 leading-tight focus:outline-none focus:shadow-sm focus:border-azul placeholder:text-gris2"
                      type="number"
                      id="year"
                      name="year"
                      min="2021"
                      max={new Date().getFullYear()}
                      step="1"
                    />
                  </div>
                  <label
                    className="mt-14 block tracking-wide text-[#212121] text-sm mb-2"
                    htmlFor="year"
                  >
                    Team
                  </label>
                  <Field name="team" component={TextEditor} />
                  <h2 className=" text-[40px] font-bold mt-20 mb-12">
                    Subir imágenes
                  </h2>
                  <div className="w-full relative mr-10 mb-10 uppercase tracking-wide text-gris1 text-lg">
                    Portada
                    <label
                      className="w-full block cursor-pointer mt-2"
                      htmlFor="project_img"
                    >
                      <Field
                        name="project_img"
                        className="hidden appearance-none w-full bg-blanco2 text-negro1 border border-gris3 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent focus:shadow-sm focus:border-azul"
                        id="project_img"
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
                  <div className="grid grid-rows-2 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-6 gap-x-10">
                    <FieldImage
                      label="Primer Imagen"
                      index={0}
                      Images={images}
                      setImages={setImages}
                    />
                    <FieldImage
                      label="Segunda Imagen"
                      index={1}
                      Images={images}
                      setImages={setImages}
                    />
                    <FieldImage
                      label="Tercer Imagen"
                      index={2}
                      Images={images}
                      setImages={setImages}
                    />
                    <FieldImage
                      label="Cuarta Imagen"
                      index={3}
                      Images={images}
                      setImages={setImages}
                    />
                    <FieldImage
                      label="Quinta Imagen"
                      index={4}
                      Images={images}
                      setImages={setImages}
                    />
                    <FieldImage
                      label="Sexta Imagen"
                      index={5}
                      Images={images}
                      setImages={setImages}
                    />
                  </div>
                </div>
              </div>

              {isError && (
                <div className="text-rojo mt-4 text-center">{isError}</div>
              )}

              <div className="flex justify-end items-center gap-6 mt-8">
                <p className="font-semibold text-gris1 uppercase text-xs">
                  * campos obligatorios
                </p>
                {isLoading ? (
                  <div className="w-96 text-white bg-gris3 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Enviando...
                  </div>
                ) : (
                  <ButtonArrow
                    type="submit"
                    text="Agregar proyecto"
                    theme="black"
                  />
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </AdminDashboard>
  )
}

export default NewProject
