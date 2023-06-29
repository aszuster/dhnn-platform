import React, { useEffect, useState } from "react"
import { useGetAllSubCategories } from "hooks/useSubCategories"
import {
  useDeleteCategory,
  useEditCategory,
  useGetCategoryById,
} from "hooks/useCategories"
import { Field, Form, Formik } from "formik"
import AdminDashboard from "pages/admin"
import ButtonArrow from "components/buttons/ButtonArrow"
import InputTextFormik from "components/form/InputTextFormik"
import TextEditor from "components/textEditor/textEditor"
import { SelectMultiple } from "components/form/SelectMultiple"
import TextButton from "components/buttons/TextButton"
import DeleteModal from "components/modals/DeleteModal"
import OrderList from "components/list/OrderList"
import { arrayMove } from "@dnd-kit/sortable"

const EditCategory = ({ id }) => {
  const { subCategories, isLoadingSubCategories } = useGetAllSubCategories()
  const { category, isLoadingCategory } = useGetCategoryById(id)
  const { mutate: mutateEdit, isError, isLoading } = useEditCategory()
  const { mutate: mutateDelete, isError: isErrorDelete } = useDeleteCategory()
  const [orderedSubcategories, setOrderedSubcategories] = useState([])
  const handleSubmit = (values) => {
    const headers = values
    if (orderedSubcategories.length > 0) {
      headers = { ...headers, subcategories: orderedSubcategories }
    }
    mutateEdit([{ id }, headers])
  }

  const submitDeleteCategory = async () => {
    mutateDelete(id)
  }

  const nameDelete = "esta categoria"
  const [showModal, setShowModal] = useState(false)
  const handleOnClose = () => setShowModal(false)

  const handleDragEnd = (event, items) => {
    const { active, over } = event
    setOrderedSubcategories(items)
    if (!active.id !== over.id) {
      setOrderedSubcategories((items) => {
        const oldIndex = items.findIndex((item) => item === active.id)
        const newIndex = items.findIndex((item) => item === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pb-4">
          <h1 className="mb-10 text-4xl lg:text-6xl font-bold">
            Editar categoria
          </h1>
          {!isLoadingCategory && (
            <Formik
              initialValues={{
                title: category?.data.title,
                text: category?.data.text,
                subcategories: category?.data.subcategories,
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
              {({ values, initialValues }) => (
                <Form>
                  <div className="flex flex-col gap-10">
                    <div className="w-full">
                      <div className="grid sm:grid-cols-2 gap-6 gap-x-10">
                        <div className="w-full mb-6">
                          <InputTextFormik
                            name="title"
                            label="*Título"
                            placeholder="Título"
                            value={values.title}
                          />
                        </div>
                        <div className="w-full mb-9 lg:mb-6">
                          <Field
                            name="subcategories"
                            component={SelectMultiple}
                            options={subCategories?.data?.map((item) => {
                              const newObj = {
                                label: item.title,
                                value: item._id,
                              }
                              return newObj
                            })}
                            placeholder="Sub-Categorias"
                            setOrderedList={setOrderedSubcategories}
                            isDisabled={isLoadingSubCategories}
                          />
                        </div>
                      </div>
                      {orderedSubcategories.length > 0 ||
                      initialValues.subcategories.length > 0 ? (
                        <div>
                          <label
                            className="block tracking-wide text-[#212121] text-sm mb-2"
                            htmlFor="order-subcategories"
                          >
                            Order sub-categories
                          </label>
                          <OrderList
                            items={
                              orderedSubcategories.length > 0
                                ? orderedSubcategories
                                : initialValues.subcategories
                            }
                            handleDragEnd={handleDragEnd}
                            isSubCategory={true}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                      <Field name="text" component={TextEditor} />
                    </div>
                  </div>

                  {isError && (
                    <div className="text-rojo mt-4 text-center">{isError}</div>
                  )}

                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex-1">
                      <TextButton
                        text="Eliminar categoria"
                        color="white"
                        classes={"bg-red-500 p-2 rounded-[10px]"}
                        action={() => setShowModal(true)}
                      />
                    </div>
                    <DeleteModal
                      onClose={handleOnClose}
                      visible={showModal}
                      itemDelete={submitDeleteCategory}
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
                        text={`Editar categoria`}
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

EditCategory.getInitialProps = async ({ query }) => {
  const { id } = await query
  return { id }
}
export default EditCategory
