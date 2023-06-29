import Link from "next/link"

export default function TextButton({
  text,
  action,
  color = "azul",
  link,
  classes,
  type = "button",
}) {
  return (
    <>
      {action && !link && (
        <button
          className={`text-${color} hover:underline hover:underline-offset-4 ${classes}`}
          onClick={action}
          type={type}
        >
          {text}
        </button>
      )}
      {link && (
        <Link href={link}>
          <a
            className={`text-${color} hover:underline hover:underline-offset-4 ${classes}`}
          >
            {text}
          </a>
        </Link>
      )}
    </>
  )
}
