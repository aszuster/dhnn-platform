import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { projectId } from "services/Projects"
import Hero from "components/heros/Hero"
import Vimeo from "@u-wave/react-vimeo"
import { useState, useEffect } from "react"
import DesignLayout from "components/layouts/DesignLayout"
import SkeletonProjectContent from "components/skeletons/projects/SkeletonProjectContent"

const Project = ({ id }) => {
  const myCategories = [
    { name: "Development" },
    { name: "Branding" },
    { name: "UX Research" },
  ]
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => setOpen(!isOpen)

  const { data: data, isLoading: isLoading } = useQuery(["project", id], () =>
    projectId({ id })
  )

  return (
    <DesignLayout>
      <div className="w-full">
        <Hero
          title={data?.data.title}
          small={data?.data.category}
          category={myCategories}
        />
        {!isLoading ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6 max-w-2xl px-6 mx-auto">
              <div className="w-full">
                <figure>
                  {data?.data.images[0].secure_url && (
                    <Image
                      src={data.data.images[0].secure_url}
                      width={828}
                      height={571}
                      alt={`Foto de ${data?.data.title}`}
                      layout={"responsive"}
                    />
                  )}
                </figure>
              </div>
              <div className="w-full">
                <figure>
                  {data?.data.images[1].secure_url && (
                    <Image
                      src={data.data.images[1].secure_url}
                      width={828}
                      height={571}
                      alt={`Foto de ${data?.data.title}`}
                      layout={"responsive"}
                    />
                  )}
                </figure>
              </div>
              <div className="w-full">
                <figure>
                  {data?.data.images[2].secure_url && (
                    <Image
                      src={data.data.images[2].secure_url}
                      width={828}
                      height={571}
                      alt={`Foto de ${data?.data.title}`}
                      layout={"responsive"}
                    />
                  )}
                </figure>
              </div>
              <div className="w-full">
                <figure>
                  {data?.data.images[3].secure_url && (
                    <Image
                      src={data.data.images[3].secure_url}
                      width={828}
                      height={571}
                      alt={`Foto de ${data?.data.title}`}
                      layout={"responsive"}
                    />
                  )}
                </figure>
              </div>

              {isOpen && (
                <div className="w-full col-span-2 relative">
                  <button
                    className="hover:bg-black hover:text-white absolute top-0 right-0 z-50 bg-yellowDHNN px-4 py-2"
                    onClick={toggleMenu}
                  >
                    Cerrar
                  </button>
                  <Vimeo
                    video={data?.data.videoUrl}
                    autoplay={true}
                    showByline={false}
                    showTitle={false}
                    showPortrait={false}
                    loop
                    responsive={true}
                    muted={false}
                    background={false}
                    controls={false}
                  />
                </div>
              )}
              {!isOpen && (
                <div className="w-full col-span-2 overflow-hidden">
                  <figure className="relative ">
                    {data?.data.videoUrl ? (
                      <button
                        onClick={toggleMenu}
                        className="flex cursor-pointer hover:scale-110 transition-all justify-center items-center h-[80px] w-[80px] rounded-full hover:text-white absolute top-[45%] right-[45%] z-50 bg-yellowDHNN pl-[6px] pt-[16px]"
                      >
                        <div className="w-5 overflow-hidden inline-block">
                          <div className="h-12 bg-black hover:bg-white rotate-45 transform origin-top-left"></div>
                        </div>
                      </button>
                    ) : (
                      <></>
                    )}

                    {data?.data.images[4].secure_url && (
                      <Image
                        src={data.data.images[4].secure_url}
                        width={1683}
                        height={571}
                        alt={`Foto de ${data?.data.title}`}
                        layout={"responsive"}
                      />
                    )}
                  </figure>
                </div>
              )}
              <div className="w-full col-span-2">
                <figure>
                  {data?.data.images[5].secure_url && (
                    <Image
                      src={data.data.images[5].secure_url}
                      width={1683}
                      height={571}
                      alt={`Foto de ${data?.data.title}`}
                      layout={"responsive"}
                    />
                  )}
                </figure>
              </div>

              <div className="bg-black px-10 py-10 xl:py-20 xl:px-24 w-full col-span-2 footer-projects">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                      <h2 className="text-white font-bold text-3xl lg:text-5xl">
                        team{" "}
                        <span className="block text-grayDHNN3">/Equipo</span>
                      </h2>
                    </div>
                    <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0 team">
                      <div
                        dangerouslySetInnerHTML={{ __html: data?.data.team }}
                      ></div>
                      <p className="text-white text-sm leading-8"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SkeletonProjectContent />
        )}
      </div>
    </DesignLayout>
  )
}

Project.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

Project.auth = true

export default Project
