const THEMES = {
  primary:
    "w-full text-white uppercase bg-black hover:bg-gris1 font-semibold rounded-lg text-sm px-5 py-2.5 text-center",
  secondary:
    "uppercase bg-amarillo ring-blue-300 hover:ring-2 focus:ring-4 font-semibold rounded-lg text-sm px-5 py-2.5 text-center",
}

export default function PrimaryButton({
  text,
  type = "button",
  theme = "primary",
  action,
  classes,
}) {
  return (
    <button
      type={type}
      className={`${THEMES[theme]} ${classes}`}
      onClick={action}
    >
      {text}
    </button>
  )
}
