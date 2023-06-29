import SidebarItem from "./SidebarItem"
import MenuItemSidebar from "./MenuItemSidebar"
import { useSections } from "hooks/useSections"
import SidebarSkeleton from "components/skeletons/operations/SidebarSkeleton"

export default function Sidebar({ idSection }) {
  const { sections, isLoadingSections } = useSections()
  return (
    <div className="sidebar p-5 pt-[120px] lg:bg-[#F4F4F4] lg:rounded-[20px] lg:p-[25px] xl:p-[45px] lg:w-[290px] bp-ope:w-[344px] 2xl:ml-[-50px] lg:min-h-[500px] lg:mt-[-470px] xl:min-h-[750px] 2xl:min-h-[970px]">
      {!isLoadingSections ? (
        <>
          {sections?.data.length > 0 && (
            <>
              {sections?.data.map((item, index) => {
                return (
                  <div key={index}>
                    <MenuItemSidebar
                      idSection={idSection}
                      item={item}
                      link={`/operaciones/section/${item._id}`}
                    >
                      <SidebarItem
                        item={item}
                        key={index}
                        section={item.title}
                      />
                    </MenuItemSidebar>
                  </div>
                )
              })}
            </>
          )}
        </>
      ) : (
        <SidebarSkeleton />
      )}
    </div>
  )
}
