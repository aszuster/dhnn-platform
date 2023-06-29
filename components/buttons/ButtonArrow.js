import Link from "next/link"

const THEMES = {
  yellow: "rouded_yellow_arrow",
  black: "rouded_black_arrow",
}

export default function ButtonArrow({
  text,
  type = "button",
  action,
  theme = "yellow",
  href,
  classes,
  disabled,
}) {
  return href ? (
    <Link href={href}>
      <button
        type={type}
        onClick={action}
        className={`${THEMES[theme]} ${classes}`}
      >
        <span>{text}</span>
        <figure></figure>
      </button>
    </Link>
  ) : (
    <button
      type={type}
      onClick={action}
      className={`${THEMES[theme]} ${classes}`}
      disabled={disabled}
    >
      <span>{text}</span>
      <figure></figure>
    </button>
  )
}
