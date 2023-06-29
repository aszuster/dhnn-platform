import React from "react"
import Select from "react-select"
const colourStyles = {
  control: (styles) => ({
    ...styles,
    border: 0,
    borderBottom: "1px solid black",
    borderRadius: 0,
    minHeight: "68px",
  }),
  placeholder: (styles) => ({ ...styles, fontSize: "40px" }),
  multiValueLabel: (styles) => ({ ...styles, fontSize: "16px" }),
  option: (styles) => ({ ...styles, borderBottom: "1px solid #C4C4C4" }),
  menuList: (styles) => ({ ...styles, borderRadius: "12px" }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "black",
    backgroundColor: "#C4C4C4",
    borderRadius: "20px",
    marginRight: "20px",
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
}
export const SelectMultiple = ({
  options,
  form,
  field,
  placeholder,
  setOrderedList,
  isDisabled = false,
}) => {
  const getValue = () => {
    if (options) {
      return options.filter((option) => field.value.indexOf(option.value) >= 0)
    } else {
      return []
    }
  }
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      option.map((item) => item.value)
    )
    if (setOrderedList) setOrderedList(option.map((item) => item.value))
  }
  return (
    <div>
      <label className="text-[#212121] text-sm mb-2">{placeholder}</label>
      <Select
        placeholder={placeholder}
        name={field.name}
        closeMenuOnSelect={false}
        onChange={onChange}
        value={getValue()}
        isMulti
        options={options}
        styles={colourStyles}
        isDisabled={isDisabled}
      />
    </div>
  )
}
