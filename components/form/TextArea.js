import { ErrorMessage, Field } from "formik"

export const TextArea = ({
  name,
  placeholder = "",
  label = "Label",
  classes,
  type,
  readOnly,
}) => {
  return (
    <div className={`select-none ${classes}`}>
      <label
        className="block uppercase tracking-wide text-grayDHNN text-4xl font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        as="textarea"
        name={name}
        className="appearance-none block w-full bg-blanco2 text-3xl text-negro1 border-b border-b-grayDHNN2 py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-sm focus:border-azul placeholder:text-gris2"
        id={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs italic"
      />
    </div>
  )
}

export default TextArea
