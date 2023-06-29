import DesignLayout from "components/layouts/DesignLayout"
import Sidebar from "components/Sidebar/Sidebar"
import HeroOperaciones from "components/heros/HeroOperaciones"
import NavbarOperaciones from "components/navOperaciones/NavOperaciones"
import Operations from "components/content/Operations"
import { useGetSectionById } from "hooks/useSections"
import ContentSkeleton from "components/skeletons/operations/ContentSkeleton"

const Section = ({ id }) => {
  const { section, isLoadingSection } = useGetSectionById(id)
  return (
    <DesignLayout>
      <div className="relative z-[9] top-[35px]">
        <NavbarOperaciones />
      </div>

      <>
        <HeroOperaciones title={!isLoadingSection ? section.data.title : ""} />
        <div className="w-full mb-16">
          <div className="max-w-2xl px-6 mx-auto mb-14">
            <div className="flex">
              <div className="hidden lg:block lg:w-1/4">
                <Sidebar idSection={id} />
              </div>
              <div className="lg:max-w-[584px] lg:pl-[90px] xl:pl-[50px] copy-operations xl:mb-[100px]">
                {!isLoadingSection ? (
                  <Operations copy={section.data.text} />
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

Section.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

Section.auth = true

export default Section
