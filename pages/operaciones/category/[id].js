import DesignLayout from "components/layouts/DesignLayout"
import Sidebar from "components/Sidebar/Sidebar"
import HeroOperaciones from "components/heros/HeroOperaciones"
import NavbarOperaciones from "components/navOperaciones/NavOperaciones"
import Operations from "components/content/Operations"
import { useGetCategoryById } from "hooks/useCategories"
import ContentSkeleton from "components/skeletons/operations/ContentSkeleton"

const Category = ({ id }) => {
  const { category, isLoadingCategory } = useGetCategoryById(id)
  return (
    <DesignLayout>
      <div className="relative z-[9] top-[35px]">
        <NavbarOperaciones />
      </div>
      <HeroOperaciones
        title={!isLoadingCategory ? category.data.title : ""}
        bkg="noBkg"
      />
      <>
        <div className="w-full mb-16">
          <div className="max-w-2xl px-6 mx-auto mb-14">
            <div className="flex">
              <div className="hidden lg:block lg:w-1/4">
                <Sidebar />
              </div>
              <div className="lg:max-w-[584px] xl:max-w-[826px] lg:pl-[90px] xl:pl-[50px] xl:mb-[100px]">
                {!isLoadingCategory ? (
                  <Operations copy={category.data.text} />
                ) : (
                  <ContentSkeleton />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </DesignLayout>
  )
}

Category.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

Category.auth = true

export default Category
