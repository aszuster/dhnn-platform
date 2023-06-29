import DesignLayout from "components/layouts/DesignLayout"
import Sidebar from "components/Sidebar/Sidebar"
import HeroOperaciones from "components/heros/HeroOperaciones"
import NavbarOperaciones from "components/navOperaciones/NavOperaciones"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion"
import { useGetSubCategoryById } from "hooks/useSubCategories"
import { useRouter } from "next/router"
import ContentSkeleton from "components/skeletons/operations/ContentSkeleton"

const Subcategory = ({ id }) => {
  const { subcategory, isLoadingSubCategory } = useGetSubCategoryById(id)

  const router = useRouter()
  const { section, category } = router.query
  return (
    <DesignLayout>
      <div className="relative z-[9] top-[35px]">
        <NavbarOperaciones />
      </div>

      <HeroOperaciones
        bkg="noBkg"
        smallSect={section}
        smallCat={category}
        title={!isLoadingSubCategory ? subcategory.data.title : ""}
        subcategory="heroSubcategory"
      />
      <div className="w-full mb-16">
        <div className="max-w-2xl px-6 mx-auto mb-14">
          <div className="flex">
            <div className="hidden lg:block lg:w-1/4">
              <Sidebar />
            </div>
            <div className="lg:max-w-[834px] lg:pl-[90px] xl:pl-[50px] lg:w-3/4">
              {!isLoadingSubCategory ? (
                <Accordion className="accord">
                  {subcategory.data.info_title_1 && (
                    <AccordionItem>
                      <AccordionHeader>
                        <h3
                          className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                        >
                          <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                            01
                          </small>
                          {subcategory.data.info_title_1}
                        </h3>
                      </AccordionHeader>

                      <AccordionBody>
                        <div className="accordion-body mb-16">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: subcategory.data.info_text_1,
                            }}
                          ></p>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  )}
                  {subcategory.data.info_title_2 && (
                    <AccordionItem>
                      <AccordionHeader>
                        <h3
                          className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                        >
                          <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                            02
                          </small>
                          {subcategory.data.info_title_2}
                        </h3>
                      </AccordionHeader>

                      <AccordionBody>
                        <div className="accordion-body mb-16">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: subcategory.data.info_text_2,
                            }}
                          ></div>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  )}
                  {subcategory.data.info_title_3 && (
                    <AccordionItem>
                      <AccordionHeader>
                        <h3
                          className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                        >
                          <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                            03
                          </small>
                          {subcategory.data.info_title_3}
                        </h3>
                      </AccordionHeader>

                      <AccordionBody>
                        <div className="accordion-body mb-16">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: subcategory.data.info_text_3,
                            }}
                          ></div>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  )}
                  {subcategory.data.info_title_4 && (
                    <AccordionItem>
                      <AccordionHeader>
                        <h3
                          className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
                        >
                          <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                            04
                          </small>
                          {subcategory.data.info_title_4}
                        </h3>
                      </AccordionHeader>

                      <AccordionBody>
                        <div className="accordion-body mb-16">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: subcategory.data.info_text_4,
                            }}
                          ></div>
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  )}
                </Accordion>
              ) : (
                <ContentSkeleton />
              )}
            </div>
          </div>
        </div>
      </div>
    </DesignLayout>
  )
}

Subcategory.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

Subcategory.auth = true

export default Subcategory
