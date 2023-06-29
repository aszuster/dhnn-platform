import Link from "next/link"
import SidebarContent from "./SidebarContent"
import { useRouter } from "next/router"

export default function SidebarItem({ item, index, section }) {
  const router = useRouter()
  const { category, subcategory } = router.query
  return (
    <>
      {item.categories.map((item, index) => {
        if (item.subcategories.length > 0) {
          return <SidebarContent item={item} key={index} section={section} />
        } else {
          return (
            <div key={index}>
              <Link
                href={{
                  pathname: `/operaciones/category/${item._id}`,
                  query: { section: section, category: item.title },
                }}
              >
                <a
                  className={`hover:opacity-[.6] transition-all ease-in-out block pl-[35px] sidebar-item sidebar-title cursor-pointer text-base ${
                    category === item.title ? "font-bold " : ""
                  }`}
                >
                  {item.title}
                </a>
              </Link>
            </div>
          )
        }
      })}
    </>
  )
}
