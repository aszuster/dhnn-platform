import React, { useState } from "react"
import {
  useDeleteSubCategory,
  useEditSubCategory,
  useGetSubCategoryById,
} from "hooks/useSubCategories"
import { Field, Form, Formik } from "formik"
import AdminDashboard from "pages/admin"
import ButtonArrow from "components/buttons/ButtonArrow"
import InputTextFormik from "components/form/InputTextFormik"
import TextEditor from "components/textEditor/textEditor"
import TextButton from "components/buttons/TextButton"
import DeleteModal from "components/modals/DeleteModal"

const EditSubCategory = ({ id }) => {
  const { subcategory, isLoadingSubCategory } = useGetSubCategoryById(id)
  const { mutate: mutateEdit, isError, isLoading } = useEditSubCategory()
  const { mutate: mutateDelete, isError: isErrorDelete } =
    useDeleteSubCategory()
  const handleSubmit = (values) => {
    const headers = values
    mutateEdit([{ id }, headers])
  }

  const submitDeleteSubCategory = async () => {
    mutateDelete(id)
  }

  const nameDelete = "esta sub-categoria"
  const [showModal, setShowModal] = useState(false)
  const handleOnClose = () => setShowModal(false)
  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pb-4">
          <h1 className="mb-10 text-4xl lg:text-6xl font-bold">
            Editar sub-categoria
          </h1>
          {!isLoadingSubCategory && (
            <Formik
              initialValues={{
                title: subcategory?.data.title,
                info_title_1: subcategory?.data.info_title_1,
                info_text_1: subcategory?.data.info_text_1,
                info_title_2: subcategory?.data.info_title_2,
                info_text_2: subcategory?.data.info_text_2,
                info_title_3: subcategory?.data.info_title_3,
                info_text_3: subcategory?.data.info_text_3,
                info_title_4: subcategory?.data.info_title_4,
                info_text_4: subcategory?.data.info_text_4,
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
                        <div className="col-span-2 w-full mb-6">
                          <InputTextFormik
                            name="title"
                            label="*Título"
                            placeholder="Título"
                            value={values.title}
                          />
                        </div>
                        <div className="w-full mb-6">
                          <h3>Primer accordion</h3>
                          <InputTextFormik
                            name="info_title_1"
                            label="Título primer accordion"
                            placeholder="Título primer accordion"
                            value={values.info_title_1}
                          />
                          <Field name="info_text_1" component={TextEditor} />
                        </div>
                        <div className="w-full mb-6">
                          <h3>Segundo accordion</h3>
                          <InputTextFormik
                            name="info_title_2"
                            label="Título segundo accordion"
                            placeholder="Título segundo accordion"
                            value={values.info_title_2}
                          />
                          <Field name="info_text_2" component={TextEditor} />
                        </div>
                        <div className="w-full mb-6">
                          <h3>Tercer accordion</h3>
                          <InputTextFormik
                            name="info_title_3"
                            label="Título tercer accordion"
                            placeholder="Título tercer accordion"
                            value={values.info_title_3}
                          />
                          <Field name="info_text_3" component={TextEditor} />
                        </div>
                        <div className="w-full mb-6">
                          <h3>Cuarto accordion</h3>
                          <InputTextFormik
                            name="info_title_4"
                            label="Título cuarto accordion"
                            placeholder="Título cuarto accordion"
                            value={values.info_title_4}
                          />
                          <Field name="info_text_4" component={TextEditor} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isError && (
                    <div className="text-rojo mt-4 text-center">{isError}</div>
                  )}
                  {isErrorDelete && (
                    <div className="text-rojo mt-4 text-center">
                      {isErrorDelete}
                    </div>
                  )}
                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex-1">
                      <TextButton
                        text="Eliminar sub-categoria"
                        color="white"
                        classes={"bg-red-500 p-2 rounded-[10px]"}
                        action={() => setShowModal(true)}
                      />
                    </div>
                    <DeleteModal
                      onClose={handleOnClose}
                      visible={showModal}
                      itemDelete={submitDeleteSubCategory}
                      nameDelete={nameDelete}
                    />
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
                        text={`Editar sub-categoria`}
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

EditSubCategory.getInitialProps = async ({ query }) => {
  const { id } = await query
  return { id }
}
export default EditSubCategory
