import styles from "./index.module.css"

const Hero = ({ title, smallSect, smallCat, bkg, arrow, subcategory }) => {
  return (
    <div
      className={`${styles.bkg_hero_operaciones} mb-[58px] lg:mb-[44px xl:mb[62px] pt-16 ${subcategory} ${bkg} `}
    >
      <div
        className={`${styles.bkg_hero_wrap_operaciones} max-w-2xl mx-auto px-6 ${arrow}`}
      >
        <div className="flex">
          <div className="lg:w-1/4"></div>
          <div
            className={`${styles.flecha} lg:w-3/4 lg:pl-[90px] xl:pl-[50px]`}
          >
            <div className="flex justify-center flex-col">
              <h4 className="font-secondary text-sm mb-7">
                {smallSect} {smallSect ? "|" : ""} {smallCat}
              </h4>
              <h1 className="text-[52px] leading-[60px] lg:text-[44px] font-bold lg:max-w-[480px]">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
