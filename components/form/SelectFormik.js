import { Field } from "formik"

export default function SelectFormik({
  name,
  placeholder,
  label,
  options,
  classes,
}) {
  return (
    <div className={`select-none ${classes}`}>
      {label && (
        <label
          className="block tracking-wide text-[#212121] text-sm mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <Field
          name={name}
          as="select"
          className="appearance-none block w-full bg-blanco2 text-[40px] text-negro1 border-b border-grayDHNN2 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
          id={name}
        >
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {options?.map((option, index) => (
            <option
              key={`select-${name}-${index}`}
              value={option.value || option.label}
              className="bg-blanco2"
            >
              {option.label}
            </option>
          ))}
        </Field>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="20.1445"
              cy="20.4999"
              r="19.8223"
              transform="rotate(-180 20.1445 20.4999)"
              fill="#C4C4C4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.0599 30.2527L19.3953 14.0735L14.1773 19.0795C13.7398 19.4993 13.5052 19.0135 13.0671 18.5569C12.6291 18.1003 12.1534 17.8458 12.591 17.426L19.7217 10.5849C20.1593 10.1651 20.8692 10.1949 21.3072 10.6515L28.4458 18.0923C28.8838 18.5489 28.3041 18.8635 27.9709 19.1832C27.6376 19.5029 27.2992 20.0691 26.8612 19.6125L21.6375 14.1677L21.3021 30.3469L19.0599 30.2527Z"
              fill="#1C1C1C"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
