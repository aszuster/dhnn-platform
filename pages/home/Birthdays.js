import BirthdaysCarousel from "components/carousels/BirthdaysCarousel/BirthdaysCarousel"
import SkeletonHomeCumples from "components/skeletons/home/SkeletonCumples"
import { useEffect, useState } from "react"

const Birthdays = () => {
  const [isLoading] = useState(false)

  return (
    <>
      {!isLoading ? (
        <div
          className="w-full relative overflow-hidden flex flex-col lg:flex-row lg:gap-x-20 gap-24 items-center lg:pt-35 lg:pb-35 px-5 py-20  bg-black 
        before:absolute before:w-[1300px] before:h-[300px] before:rounded-tl-full before:rounded-tr-full before:bg-[#494949] before:left-52 before:bottom-0 before:z-0 before:blur-[150px] 
      "
        >
          <section className="w-full max-w-[1200px] mx-auto flex flex-wrap items-center justify-center">
            <div className="w-full lg:w-[487px] flex flex-col text-white relative">
              <p className="font-secondary text-sm xl:text-[14px] text-[#AEAEAE] mb-[16px]">
                celebraciones
              </p>
              <h1 className="text-[32px] lg:text-[40px] leading-[1em]  md:leading-[46px] font-bold mb-[50px] lg:mb-[0]">
                cumpleaños&nbsp;
                <br className="hidden lg:block" />
                dhnn<span className="lg:hidden">—</span>
              </h1>
            </div>
            <div className="w-full lg:w-2/4 flex flex-col">
              <BirthdaysCarousel />
            </div>
          </section>
        </div>
      ) : (
        <SkeletonHomeCumples />
      )}
    </>
  )
}

export default Birthdays
