import { useState } from "react"
import CardProject from "components/cards/cardProject"
import Hero from "components/heros/Hero"
import DesignLayout from "components/layouts/DesignLayout"
import { useFilteredProject } from "hooks/useProjects"
import DropdownFilter from "components/form/DropdownFilter"
import SkeletonProjects from "components/skeletons/projects/SkeletonProjects"

const Proyectos = () => {
  const [category, setCategory] = useState("")
  const [year, setYear] = useState(0)
  const { projects, isLoading } = useFilteredProject(category, year)
  const test = true
  return (
    <DesignLayout>
      <Hero title="Proyectos" />
      <section className="w-full pt-12 bg-[#F4F4F4]">
        <div className="max-w-2xl px-6 mx-auto pb-24 lg:pb-[186px]">
          <div className="w-full flex flex-col  md:flex-row justify-between mb-20">
            <p className="text-sm font-secondary  mb-6 md:mb-0">
              Proyectos @ DHNN™
            </p>
            <div className="flex flex-col  md:flex-row md:items-center gap-2 ">
              <p className="text-sm font-secondary mr-3">Filter by</p>
              <DropdownFilter
                options={[
                  { label: "All Categories", setValue: () => setCategory("") },
                  {
                    label: "Medio & OTT",
                    setValue: () => setCategory("medio"),
                  },
                  {
                    label: "Entertainment",
                    setValue: () => setCategory("entertainment"),
                  },
                  {
                    label: "Insurance & Insurtech",
                    setValue: () => setCategory("insurance"),
                  },
                  {
                    label: "Energy & Industrials",
                    setValue: () => setCategory("energy"),
                  },
                  {
                    label: "Banking & Finance",
                    setValue: () => setCategory("banking"),
                  },
                  {
                    label: "Retail & Commerce",
                    setValue: () => setCategory("retail"),
                  },
                  {
                    label: "InformationTech",
                    setValue: () => setCategory("information"),
                  },
                ]}
                label="Category"
                value={category}
              />
              <DropdownFilter
                options={[
                  { label: "All years", setValue: () => setYear(0) },
                  { label: "2021", setValue: () => setYear(2021) },
                  { label: "2022", setValue: () => setYear(2022) },
                  { label: "2023", setValue: () => setYear(2023) },
                ]}
                label="Year"
                value={year}
              />
            </div>
          </div>
          {!test ? (
            <>
              {projects?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[72px]">
                    {projects?.map((project) => {
                      return (
                        <div key={project._id}>
                          <CardProject
                            id={project._id}
                            title={project.title}
                            category={project.category}
                            state={project.state}
                            image={project?.project_img?.secure_url}
                          />
                          <hr className="border-solid border-[1px] border-grayDHNN" />
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center w-full">
                    <p className="font-secondary">
                      <span className="text-[40px] mb-4">&#128269;</span> No hay
                      proyectos en “{category}”
                    </p>
                  </div>
                </>
              )}
            </>
          ) : (
            <SkeletonProjects />
          )}
        </div>
      </section>
    </DesignLayout>
  )
}

Proyectos.auth = true

export default Proyectos
