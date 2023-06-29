import React, { useState } from "react"
import { useCategories, useNewCategory } from "hooks/useCategories"
import { useGetAllSubCategories } from "hooks/useSubCategories"
import { useNewSection } from "hooks/useSections"
import { Field, Form, Formik } from "formik"
import AdminDashboard from "pages/admin"
import ButtonArrow from "components/buttons/ButtonArrow"
import InputTextFormik from "components/form/InputTextFormik"
import TextEditor from "components/textEditor/textEditor"
import { SelectMultiple } from "components/form/SelectMultiple"
import OrderList from "components/list/OrderList"
import { arrayMove } from "@dnd-kit/sortable"

const initialValuesSections = {
  title: "",
  text: "",
  categories: [],
}

const initialValuesCategories = {
  title: "",
  text: "",
  subcategories: [],
}

const NewOperation = ({ type }) => {
  const [orderedSubItem, setOrderedSubItem] = useState([])
  const { categories, isLoadingCategories } = useCategories()
  const { subCategories, isLoadingSubCategories } = useGetAllSubCategories()
  const {
    mutate: mutateSection,
    isError: isErrorSection,
    isLoading: isLoadingNewSec,
  } = useNewSection()
  const {
    mutate: mutateCategory,
    isError: isErrorCategory,
    isLoading: isLoadingNewCat,
  } = useNewCategory()
  const handleSubmit = (values) => {
    const headers = values
    if (orderedSubItem.length > 0 && type == 1) {
      headers = { ...headers, categories: orderedSubItem }
    } else if (orderedSubItem.length > 0 && type == 2) {
      headers = { ...headers, subcategories: orderedSubItem }
    }
    console.log(headers)
    if (type == 1) mutateSection(headers)
    else mutateCategory(headers)
  }
  const handleDragEnd = (event, items) => {
    const { active, over } = event
    setOrderedSubItem(items)
    if (!active.id !== over.id) {
      setOrderedSubItem((items) => {
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
            Agregar {type == 1 ? "seccion" : "categoria"} nueva
          </h1>
          <Formik
            initialValues={
              type == 1 ? initialValuesSections : initialValuesCategories
            }
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
                      {type == 1 ? (
                        <>
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
                            setOrderedList={setOrderedSubItem}
                            isDisable={isLoadingCategories}
                          />
                        </>
                      ) : (
                        <>
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
                            setOrderedList={setOrderedSubItem}
                            isDisable={isLoadingSubCategories}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {orderedSubItem.length > 0 && (
                    <div>
                      <label
                        className="block tracking-wide text-[#212121] text-sm mb-2"
                        htmlFor="order-subcategories"
                      >
                        Order {type == 1 ? "categories" : "sub-categories"}
                      </label>
                      <OrderList
                        items={orderedSubItem}
                        handleDragEnd={handleDragEnd}
                        isSubCategory={type == 1 ? false : true}
                      />
                    </div>
                  )}
                  <Field name="text" component={TextEditor} />
                </div>
              </div>

              {isErrorCategory ||
                (isErrorSection && (
                  <div className="text-rojo mt-4 text-center">
                    {isErrorCategory || isErrorSection}
                  </div>
                ))}

              <div className="flex justify-end items-center gap-6 mt-8">
                <p className="font-semibold text-gris1 uppercase text-xs">
                  * campos obligatorios
                </p>
                {isLoadingNewCat || isLoadingNewSec ? (
                  <div className="w-96 text-white bg-gris3 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Enviando...
                  </div>
                ) : (
                  <ButtonArrow
                    type="submit"
                    text={`Agregar ${type == 1 ? "seccion" : "categoria"}`}
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

NewOperation.getInitialProps = async ({ query }) => {
  const { type } = await query
  return { type }
}
export default NewOperation
