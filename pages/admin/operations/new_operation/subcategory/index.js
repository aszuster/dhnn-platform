import { Field, Form, Formik } from "formik"
import AdminDashboard from "pages/admin"
import ButtonArrow from "components/buttons/ButtonArrow"
import InputTextFormik from "components/form/InputTextFormik"
import TextEditor from "components/textEditor/textEditor"
import { useNewSubCategory } from "hooks/useSubCategories"

const NewSubCategory = () => {
  const { mutate, isLoading, isError } = useNewSubCategory()
  const handleSubmit = (values) => {
    const headers = values
    mutate(headers)
  }
  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <div className="bg-white px-6 pb-4">
          <h1 className="mb-10 text-4xl lg:text-6xl font-bold">
            Agregar sub-categoria nueva
          </h1>
          <Formik
            initialValues={{
              title: "",
              info_title_1: "",
              info_text_1: "",
              info_title_2: "",
              info_text_2: "",
              info_title_3: "",
              info_text_3: "",
              info_title_4: "",
              info_text_4: "",
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
                    <div className="col-span-2 w-full mb-6">
                      <InputTextFormik
                        name="title"
                        label="*Título"
                        placeholder="Título"
                      />
                    </div>
                    <div className="w-full mb-6">
                      <h3>Primer accordion</h3>
                      <InputTextFormik
                        name="info_title_1"
                        label="*Título primer accordion"
                        placeholder="Título primer accordion"
                      />
                      <Field name="info_text_1" component={TextEditor} />
                    </div>
                    <div className="w-full mb-6">
                      <h3>Segundo accordion</h3>
                      <InputTextFormik
                        name="info_title_2"
                        label="*Título segundo accordion"
                        placeholder="Título segundo accordion"
                      />
                      <Field name="info_text_2" component={TextEditor} />
                    </div>
                    <div className="w-full mb-6">
                      <h3>Tercer accordion</h3>
                      <InputTextFormik
                        name="info_title_3"
                        label="*Título tercer accordion"
                        placeholder="Título tercer accordion"
                      />
                      <Field name="info_text_3" component={TextEditor} />
                    </div>
                    <div className="w-full mb-6">
                      <h3>Cuarto accordion</h3>
                      <InputTextFormik
                        name="info_title_4"
                        label="*Título cuarto accordion"
                        placeholder="Título cuarto accordion"
                      />
                      <Field name="info_text_4" component={TextEditor} />
                    </div>
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
                    text="Agregar sub-categoria"
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

export default NewSubCategory
