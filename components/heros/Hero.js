import styles from "./index.module.css"

const Hero = ({ title, small, category, bkg, arrow, size, margin }) => {
  return (
    <div className={`${styles.bkg_hero} mb-24 pt-16 lg:pt-[90px] ${bkg} `}>
      <div
        className={`${styles.bkg_hero_wrap} xl:max-w-[90%] 2xl:max-w-2xl mx-auto px-6 pb-24 lg:pb-[147px] ${arrow}`}
      >
        <h4 className="font-secondary text-sm mb-7 hidden">{small}</h4>

        {size === "sm" ? (
          <h1 className="text-[54px] lg:text-[72px] font-bold">{title}</h1>
        ) : (
          <h1 className="text-7xl lg:text-[72px] font-bold">{title}</h1>
        )}
        <div className="absolute">
          {category?.map((cat, index) => (
            <>
              <h4
                key={index}
                className="bg-yellowDHNN text-sm inline-block rounded-full mt-4 lg:mt-6 mb-3 xl:mb-0 mr-3 py-2 px-5"
              >
                {cat.name}
              </h4>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
