import React, { useState } from "react"
import { useCategories } from "hooks/useCategories"
import {
  useDeleteSection,
  useEditSection,
  useGetSectionById,
} from "hooks/useSections"
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

const EditSection = ({ id }) => {
  const { categories, isLoadingCategories } = useCategories()
  const { section, isLoadingSection } = useGetSectionById(id)
  const { mutate: mutateEdit, isError, isLoading } = useEditSection()
  const { mutate: mutateDelete, isError: isErrorDelete } = useDeleteSection()
  const [orderedCategories, setOrderedCategories] = useState([])
  const handleSubmit = (values) => {
    const headers = values
    if (orderedCategories) {
      headers = { ...headers, categories: orderedCategories }
    }
    mutateEdit([{ id }, headers])
  }

  const submitDeleteSection = async () => {
    mutateDelete(id)
  }
  const nameDelete = "esta seccion"
  const [showModal, setShowModal] = useState(false)
  const handleOnClose = () => setShowModal(false)

  const handleDragEnd = (event, items) => {
    const { active, over } = event
    setOrderedCategories(items)
    if (!active.id !== over.id) {
      setOrderedCategories((items) => {
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
            Editar seccion
          </h1>
          {!isLoadingSection && (
            <Formik
              initialValues={{
                title: section?.data.title,
                text: section?.data.text,
                categories: section?.data.categories,
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
                            name="categories"
                            component={SelectMultiple}
                            options={categories?.data?.map((item) => {
                              const newObj = {
                                label: item.title,
                                value: item._id,
                              }
                              return newObj
                            })}
                            placeholder="Categorias"
                            setOrderedList={setOrderedCategories}
                            isDisabled={isLoadingCategories}
                          />
                        </div>
                      </div>
                      {orderedCategories.length > 0 ||
                      initialValues.categories.length > 0 ? (
                        <div>
                          <label className="block tracking-wide text-[#212121] text-sm mb-2">
                            Order categories
                          </label>
                          <OrderList
                            items={
                              orderedCategories.length > 0
                                ? orderedCategories
                                : initialValues.categories
                            }
                            handleDragEnd={handleDragEnd}
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
                        text="Eliminar proyecto"
                        color="white"
                        classes={"bg-red-500 p-2 rounded-[10px]"}
                        action={() => setShowModal(true)}
                      />
                    </div>
                    <DeleteModal
                      onClose={handleOnClose}
                      visible={showModal}
                      itemDelete={submitDeleteSection}
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
                        text={`Editar seccion`}
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

EditSection.getInitialProps = async ({ query }) => {
  const { id } = await query
  return { id }
}
export default EditSection
