export const InputText = ({
  name,
  placeholder = "",
  label = "Label",
  inputRef,
  value,
  error,
  classes,
  type,
}) => {
  return (
    <div className={`select-none ${classes}`}>
      <label className="block uppercase tracking-wide text-gris1 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        ref={inputRef || null}
        name={name}
        value={value || undefined}
        className="appearance-none block w-full bg-blanco2 text-negro1 border border-gris3 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow-sm focus:border-azul"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </div>
  )
}

export default InputText
