import CategoriesTable from "components/tables/operations/CategoriesTable"
import SectionsTable from "components/tables/operations/SectionsTable"
import SubCategoriesTable from "components/tables/operations/SubCategoriesTable"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion"
import AdminDashboard from ".."
import { useSections } from "hooks/useSections"
import { useCategories } from "hooks/useCategories"
import { useGetAllSubCategories } from "hooks/useSubCategories"

const Operaciones = () => {
  const { sections, isLoadingSections } = useSections()
  const { categories, isLoadingCategories } = useCategories()
  const { subCategories, isLoadingSubCategories } = useGetAllSubCategories()

  return (
    <AdminDashboard>
      <div className="w-full px-2 md:px-12 mt-10">
        <Accordion className="accord">
          <AccordionItem>
            <AccordionHeader>
              <h3
                className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
              >
                <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                  01
                </small>
                Secciones
              </h3>
            </AccordionHeader>

            <AccordionBody>
              <div className="accordion-body mb-16">
                <SectionsTable
                  sections={sections}
                  isLoadingSections={isLoadingSections}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <h3
                className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
              >
                <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                  02
                </small>
                Categorias
              </h3>
            </AccordionHeader>

            <AccordionBody>
              <div className="accordion-body mb-16">
                <CategoriesTable
                  categories={categories}
                  isLoadingCategories={isLoadingCategories}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <h3
                className={`accordion-title relative pl-7 lg:pl-10 lg:text-2xl`}
              >
                <small className="absolute left-0 top-0 text-sm text-black font-secondary">
                  03
                </small>
                Sub-categorias
              </h3>
            </AccordionHeader>

            <AccordionBody>
              <div className="accordion-body mb-16">
                <SubCategoriesTable
                  subCategories={subCategories}
                  isLoadingSubCategories={isLoadingSubCategories}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </AdminDashboard>
  )
}

Operaciones.auth = true
export default Operaciones
