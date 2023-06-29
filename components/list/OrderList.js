import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import ListItemSubcategory from "./ListItemSubcategory"
import ListItemCategory from "./ListItemCategory"

const OrderList = ({ items, handleDragEnd, isSubCategory = false }) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => handleDragEnd(event, items)}
    >
      <SortableContext strategy={verticalListSortingStrategy} items={items}>
        {isSubCategory ? (
          <>
            {items?.map((item) => {
              return <ListItemSubcategory key={item} id={item} />
            })}
          </>
        ) : (
          <>
            {items?.map((item) => {
              return <ListItemCategory key={item} id={item} />
            })}
          </>
        )}
      </SortableContext>
    </DndContext>
  )
}

export default OrderList
