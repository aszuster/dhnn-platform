import Image from "next/image"
import { useState } from "react"
import { Form, Field, Formik } from "formik"
//Components
import { InputTextFormik } from "components/form/InputTextFormik"
import AdminDashboard from "../../index"
import TextButton from "components/buttons/TextButton"
import FieldImage from "components/form/FieldImage"
import TextEditor from "components/textEditor/textEditor"
import Dropdown from "components/form/Dropdown"
import Delete from "components/svg/Delete"
import DeleteModal from "components/modals/DeleteModal"
import ButtonArrow from "components/buttons/ButtonArrow"
import {
  useDeleteProject,
  useEditImages,
  useEditProject,
  useProjectById,
} from "hooks/useProjects"
import { SelectMultiple } from "components/form/SelectMultiple"

const ImageFieldOrder = {
  0: "Primer",
  1: "Segunda",
  2: "Tercer",
  3: "Cuarta",
  4: "Quinta",
  5: "Sexta",
}

const EditProject = ({ id }) => {
  const [previewSourceIcon, setPreviewSourceIcon] = useState("")
  const [DropdownState, setDropdownState] = useState(null)
  const [DropdownCategory, setDropdownCategory] = useState(null)
  const [images, setImages] = useState([])
  const { initialProject, isLoadingInitial } = useProjectById(id)
  const {
    mutate: mutateEdit,
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
  } = useEditProject()

  const { mutate: mutateDelete, isError: isErrorDelete } = useDeleteProject()
  const editImages = useEditImages()
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
  const submitDeleteProject = async () => {
    mutateDelete(id)
  }

  const handleSubmit = async (values) => {
    let headers = values
    const updatedHeaders = await editImages(
      previewSourceIcon,
      initialProject,
      images,
      headers
    )
    if (DropdownCategory)
      updatedHeaders = { ...updatedHeaders, category: DropdownCategory }
    if (DropdownState)
      updatedHeaders = { ...updatedHeaders, state: DropdownState }
    mutateEdit([{ id }, { ...updatedHeaders }])
  }

  const nameDelete = "este proyecto"
  const [showModal, setShowModal] = useState(false)
  const handleOnClose = () => setShowModal(false)
  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pt-8 pb-4">
          <h1 className="mb-10 text-6xl font-bold">Editar proyecto</h1>
          {isLoadingInitial && <p className="mb-4">Cargando proyecto...</p>}
          {initialProject && (
            <Formik
              initialValues={{
                title: initialProject.data.title,
                videoUrl: initialProject.data.videoUrl,
                year: initialProject.data.year,
                state: initialProject.data.state,
                category: initialProject.data.category,
                tags: initialProject.data.tags,
                team: initialProject.data.team,
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
                      <div className="grid sm:grid-cols-2 gap-6 gap-x-10">
                        <div className="w-full mb-6">
                          <InputTextFormik
                            name="title"
                            label="*Title"
                            value={values.title}
                          />
                        </div>
                        <div className="w-full mb-6">
                          <Dropdown
                            label="Estado"
                            options={[
                              { label: "En curso", value: "en_curso" },
                              { label: "Finalizados", value: "finalizados" },
                            ]}
                            setValue={setDropdownState}
                            value={
                              DropdownState
                                ? DropdownState
                                : initialProject.data.state
                            }
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6 gap-x-10">
                        <div className="w-full mb-6">
                          <InputTextFormik
                            name="videoUrl"
                            label="Video Url"
                            placeholder="Video Url"
                            value={values.videoUrl}
                          />
                        </div>
                        <div className="w-full mb-6">
                          <Dropdown
                            label="Categoria"
                            options={[
                              { label: "Medio & OTT", value: "Medio & OTT" },
                              {
                                label: "Entertainment",
                                value: "Entertainment",
                              },
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
                            value={
                              DropdownCategory
                                ? DropdownCategory
                                : initialProject.data.category
                            }
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6 gap-x-10">
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
                        <Field
                          name="tags"
                          component={SelectMultiple}
                          options={[
                            { label: "Development", value: "Development" },
                            { label: "Branding", value: "Branding" },
                            {
                              label: "UX Research",
                              value: "UX Research",
                            },
                          ]}
                          placeholder="Tags"
                        />
                      </div>
                      <Field name="team" component={TextEditor} />
                      <h2 className=" text-[40px] font-bold mt-20 mb-12">
                        Subir imágenes
                      </h2>
                      <div className="w-full relative mr-10 mb-10 uppercase tracking-wide text-gris1 text-lg">
                        Portada
                        <label
                          className="block cursor-pointer mt-2"
                          htmlFor="project_img"
                        >
                          <Field
                            name="project_img"
                            className="hidden appearance-none w-full bg-blanco2 text-negro1 border border-gris3 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent focus:shadow-sm focus:border-azul"
                            id="project_img"
                            type="file"
                            onChange={handleFileInputChange}
                          />
                          <div className="relative  w-full h-60  bg-transparent image-container">
                            {!previewSourceIcon &&
                              initialProject.data.project_img?.secure_url && (
                                <Image
                                  src={
                                    initialProject.data.project_img?.secure_url
                                  }
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
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21 14V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V14"
                                    stroke="#7B7B7B"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.70613 8.65625L11.9488 4.41361L16.1914 8.65625"
                                    stroke="#7B7B7B"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.9497 14.899V4.99947"
                                    stroke="#7B7B7B"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
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
                        {initialProject.data.images.map((item, index) => {
                          return (
                            <FieldImage
                              key={index}
                              label={`${ImageFieldOrder[index]} imagen`}
                              index={index}
                              initialImages={initialProject.data.images}
                              Images={
                                images.length > 0
                                  ? images
                                  : initialProject.data.images
                              }
                              setImages={setImages}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {isErrorDelete ||
                    (isErrorEdit && (
                      <div className="text-rojo mt-4 text-center">
                        {isErrorDelete}
                      </div>
                    ))}

                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex-1">
                      <TextButton
                        text="Eliminar proyecto"
                        color="white"
                        classes={"bg-red-500 p-2 rounded-[10px]"}
                        action={() => setShowModal(true)}
                      />
                    </div>
                    <DeleteModal
                      onClose={handleOnClose}
                      visible={showModal}
                      itemDelete={submitDeleteProject}
                      nameDelete={nameDelete}
                    />

                    <p className="font-semibold text-gris1 uppercase text-xs">
                      * campos obligatorios
                    </p>
                    <ButtonArrow
                      type="submit"
                      text="Editar proyecto"
                      theme="black"
                      disabled={isLoadingEdit ? true : false}
                    />
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

EditProject.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

EditProject.auth = true

export default EditProject
