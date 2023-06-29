import Image from "next/image"
import { useState } from "react"
import { Form, Field, Formik } from "formik"
import { useDeleteUser, useEditUser, useGetUserById } from "hooks/useTeam"
import { uploadFiles } from "services/uploadFiles"
import axios from "axios"
import AdminDashboard from "../../index"
import TextButton from "components/buttons/TextButton"
import InputTextFormik from "components/form/InputTextFormik"
import DeleteModal from "components/modals/DeleteModal"
import Dropdown from "components/form/Dropdown"
import ButtonArrow from "components/buttons/ButtonArrow"

const EditUser = ({ id }) => {
  const [previewSource, setPreviewSource] = useState("")
  const [DropdownRole, setDropdownRole] = useState("")
  const [DropdownArea, setDropdownArea] = useState("")
  const [DropdownState, setDropdownState] = useState("")
  const { user: initialUser, isLoadingUser: isLoadingInitial } =
    useGetUserById(id)
  const {
    mutate: mutateEdit,
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
  } = useEditUser()
  const { mutate: mutateDelete, isSuccess: isSuccessDelete } = useDeleteUser()

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const submitDeleteUser = async () => {
    mutateDelete(id)
  }

  const handleSubmit = async (values) => {
    if (id) {
      let headers = values
      if (DropdownRole) {
        headers = {
          ...headers,
          role: DropdownRole,
        }
      }
      if (DropdownState) {
        headers = {
          ...headers,
          state: DropdownState,
        }
      }
      if (DropdownArea) {
        headers = {
          ...headers,
          area: DropdownArea,
        }
      }
      if (previewSource) {
        const new_image = await uploadFiles(previewSource, "users_preset")
        if (initialUser.data.picture.public_id) {
          const prev_data_image = {
            public_id: initialUser.data.picture.public_id,
            preset: "users_preset",
          }
          await axios.delete("/api/files/delete", { data: prev_data_image })
        }
        headers = {
          ...headers,
          picture: {
            public_id: new_image.public_id,
            secure_url: new_image.secure_url,
          },
        }
      }
      mutateEdit([{ id }, headers])
    }
  }
  const nameDelete = "este usuario"
  const [showModal, setShowModal] = useState(false)
  const handleOnClose = () => setShowModal(false)

  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pt-8 pb-4">
          <h1 className="mb-10 text-6xl font-bold">Editar integrante</h1>
          {!isLoadingInitial && (
            <>
              <Formik
                initialValues={{
                  role: initialUser.data.role,
                  name: initialUser.data.name,
                  occupation: initialUser.data.occupation,
                  state: initialUser.data.state,
                  birthday: initialUser.data.birthday,
                  profile_link: initialUser.data.profile_link,
                }}
                validate={(values) => {
                  const errors = {}
                  if (!values.name) {
                    errors.name = "Requerido"
                  }
                  if (!values.birthday) {
                    errors.birthday = "Requerido"
                  } else if (
                    !/(?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])[-/.](?:19\d{2}|20[01][0-9]|2023)\b/g.test(
                      values.birthday
                    )
                  ) {
                    errors.birthday = "Fecha de nacimiento inválida"
                  }
                  return errors
                }}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form>
                    <div className="flex flex-col items-start">
                      <div className="w-full mb-10 uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Imagen
                        <label
                          className="block cursor-pointer uppercase tracking-wide text-gray-700 text-xs font-bold mt-2"
                          htmlFor="file"
                        >
                          <Field
                            name="file"
                            className="hidden appearance-none w-full bg-blanco2 text-negro1 border border-gris3 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent focus:shadow-sm focus:border-azul"
                            id="file"
                            type="file"
                            onChange={handleFileInputChange}
                          />
                          <div className="relative w-60 h-60 bg-transparent">
                            {!previewSource &&
                              initialUser.data.picture?.secure_url && (
                                <Image
                                  src={initialUser.data.picture.secure_url}
                                  alt="Imagen cargada"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              )}
                            {previewSource ? (
                              <Image
                                src={previewSource}
                                alt="Imagen cargada"
                                layout="fill"
                                objectFit="contain"
                              />
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

                      <div className="w-full">
                        <div className="grid grid-cols-1 gap-6">
                          <div className="w-full mb-6">
                            <InputTextFormik
                              name="email"
                              label="*Email"
                              placeholder={initialUser.data.email}
                              value={values.email}
                              readOnly
                            />
                          </div>
                          <div className="w-full mb-6">
                            <InputTextFormik
                              name="name"
                              label="*Nombre y Apellido"
                              value={values.name}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="w-full mb-6">
                            <InputTextFormik
                              name="birthday"
                              label="*Fecha de nacimiento (Formato: MM/DD/YYYY)"
                              placeholder="Fecha de nacimiento"
                              value={values.birthday}
                            />
                          </div>
                          <div className="w-full mb-6">
                            <InputTextFormik
                              name="profile_link"
                              label="Link de la ficha"
                              placeholder="Link de la ficha"
                              value={values.profile_link}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="w-full mb-6">
                            <Dropdown
                              label="Area"
                              options={[
                                { label: "Diseño", value: "Diseño" },
                                { label: "Desarrollo", value: "Desarrollo" },
                                { label: "People", value: "People" },
                                {
                                  label: "Project Management",
                                  value: "Project Management",
                                },
                                {
                                  label: "Management team",
                                  value: "Management team",
                                },
                                { label: "Finanzas", value: "Finanzas" },
                                { label: "I.T", value: "I.T" },
                              ]}
                              setValue={setDropdownArea}
                              value={
                                DropdownArea
                                  ? DropdownArea
                                  : initialUser.data.area
                              }
                            />
                          </div>
                          <div className="w-full mb-6">
                            <InputTextFormik
                              name="occupation"
                              label="Ocupación"
                              placeholder="Ocupación"
                              value={values.occupation}
                            />
                          </div>
                          <div className="w-full mb-6">
                            <Dropdown
                              label="Rol"
                              options={[
                                { label: "Miembro", value: "miembro" },
                                {
                                  label: "Administrador",
                                  value: "admin",
                                },
                              ]}
                              setValue={setDropdownRole}
                              value={
                                DropdownRole
                                  ? DropdownRole
                                  : initialUser.data.role
                              }
                            />
                          </div>
                          <div className="w-full mb-6">
                            <Dropdown
                              label="Estado"
                              options={[
                                { label: "Activo", value: "Activo" },
                                { label: "Inactivo", value: "Inactivo" },
                              ]}
                              setValue={setDropdownState}
                              value={
                                DropdownState
                                  ? DropdownState
                                  : initialUser.data.state
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {isErrorEdit && (
                      <div className="text-rojo mt-4 text-center">
                        {isErrorEdit}
                      </div>
                    )}

                    <div className="relative flex items-center justify-end gap-6 mt-8">
                      <div className="absolute left-0 inline-flex">
                        <TextButton
                          text="Eliminar intengrante"
                          color="white"
                          classes={"bg-red-500 p-2 rounded-[10px]"}
                          action={() => setShowModal(true)}
                        />
                      </div>
                      <DeleteModal
                        onClose={handleOnClose}
                        visible={showModal}
                        itemDelete={submitDeleteUser}
                        nameDelete={nameDelete}
                      />

                      <p className="font-semibold text-gris1 uppercase text-xs">
                        * campos obligatorios
                      </p>
                      <ButtonArrow
                        type="submit"
                        text="Editar usuario"
                        theme="black"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </AdminDashboard>
  )
}

EditUser.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

EditUser.auth = "admin"

export default EditUser
