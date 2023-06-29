import { ErrorMessage, Field } from "formik"
import { useState } from "react"

export const InputTextFormik = ({
  name,
  placeholder = "",
  label = "Label",
  classes,
  type,
  readOnly,
  value,
}) => {
  const [showLabel, setShowLabel] = useState(value ? true : false)
  return (
    <div className={`select-none ${classes}`}>
      {showLabel === true && (
        <label
          className="block tracking-wide text-[#212121] text-sm mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Field
        name={name}
        className="appearance-none block w-full bg-blanco2 text-[40px] text-negro1 border-b border-grayDHNN2 py-2 px-4 mb-3 leading-tight focus:outline-none focus:shadow-sm focus:border-azul placeholder:text-gris2"
        id={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        readOnly={readOnly}
        onClick={() => setShowLabel(!showLabel)}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs italic"
      />
    </div>
  )
}

export default InputTextFormik
