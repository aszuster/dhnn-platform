import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function SidebarContent({ item, index, section }) {
  const router = useRouter()
  const { category, subcategory } = router.query
  const [open, setOpen] = useState(category === item.title ? true : false)

  useEffect(() => {
    setOpen(category === item.title)
  }, [category, item.title])

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div key={index}>
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="relative hover:opacity-60 flex flex-row items-center sidebar-title cursor-pointer transition-all">
          <Link
            href={{
              pathname: `/operaciones/category/${item._id}`,
              query: { section: section, category: item.title },
            }}
          >
            <a
              className={`text-base pl-[31px] pr-[10px] ${
                category === item.title ? "font-bold" : ""
              }`}
            >
              {item.title}
            </a>
          </Link>

          <i
            onClick={toggleOpen}
            className="plus ml-auto toggle-plus-btn relative top-[3px] inline-block transition-all"
          ></i>
        </div>

        <div className="sidebar-content pl-[31px]">
          {item.subcategories.length > 0 && (
            <>
              {item.subcategories.map((subItem, index) => (
                <Link
                  key={subItem._id}
                  href={{
                    pathname: `/operaciones/subcategory/${subItem._id}`,
                    query: {
                      section: section,
                      category: item.title,
                      subcategory: subItem.title,
                    },
                  }}
                >
                  <a
                    className={`hover:opacity-[.6] transition-all ease-in-out  border-l-[3px] border-[#C4C4C4] block text-[#7B7B7B] pt-2 pb-4 sidebar-item sidebar-title pl-[24px] leading-4 cursor-pointer text-base ${
                      subcategory === subItem.title ? "current-subcategory" : ""
                    } `}
                  >
                    {subItem.title}
                  </a>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
