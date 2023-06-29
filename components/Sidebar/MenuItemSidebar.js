import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function MenuItemSidebar({
  item,
  index,
  children,
  link,
  idSection,
}) {
  const router = useRouter()
  const { section } = router.query
  const [open, setOpen] = useState(
    section === item.title || idSection === item._id ? true : false
  )

  useEffect(() => {
    setOpen(section === item.title || idSection === item._id)
  }, [idSection, item._id, section, item.title])

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="relative flex">
        <Link href={link}>
          <a
            id={`p${item._id}`}
            className={`hover:opacity-[.6] transition-all ease-in-out text-[16px] leading-[22px] mb-[20px] ${
              section === item.title || idSection === item._id
                ? "font-bold"
                : ""
            }`}
          >
            {item.title}
          </a>
        </Link>
        {item.categories.length > 0 && (
          <i
            onClick={toggleOpen}
            className={`${
              open ? "toggle-btn-open" : "toggle-btn"
            } ml-auto relative top-[3px] inline-block transition-all`}
          ></i>
        )}
      </div>

      {/* ESTO DEBE ABRIRSE */}

      <div
        className={`${open ? "submenu-opened" : ""} close-content-sidebar`}
        key={index}
      >
        {children}
      </div>
    </div>
  )
}
