import Image from "next/image"
import Link from "next/link"
import styles from "./index.module.css"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useFeaturedNews } from "hooks/useNews"
import SkeletonHomeSliderNews from "components/skeletons/home/SkeletonSliderNews"

export default function SliderNews() {
  const { data: filteredNews, isLoading } = useFeaturedNews()
  return (
    <div className={`SliderNews max-w-2xl px-6 mx-auto`}>
      {!isLoading ? (
        <Swiper
          slidesPerView={1}
          navigation={true}
          breakpoints={{
            769: {
              slidesPerView: 1,
            },
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredNews?.length > 0 ? (
            <>
              {filteredNews.map((ne, index) => {
                return (
                  <SwiperSlide key={ne._id}>
                    <article className="flex flex-wrap lg:flex-row-reverse mx-auto max-w-[1255px]">
                      <div
                        className={`w-full lg:w-1/2 bg-black min-h-[361px] lg:min-h-[500px] px-[26px] py-[65px] lg:min-h-[0px] rounded-[19px] lg:rounded-lg lg:p-20`}
                      >
                        <p className="text-white font-secondary text-[77px] mb-[42px] lg:text-[3.25rem] mb-4 xl:mb-20 relative">
                          0{index + 1}
                          <span className="text-[11px] lg:text-sm absolute pl-2 bottom-[20px] lg:bottom-[15px]">
                            /0{filteredNews.length}
                          </span>
                        </p>
                        <h2 className="text-white font-bold text-[28px] leading-[35px] lg:text-3xl xl:text-[2rem] xl:leading-10 2xl:text-[2rem]">
                          {ne.title}
                        </h2>
                        <Link href={`news/${ne._id}`}>
                          <a className="transition-all inline-block mt-[24px] text-base font-bold text-white underline hover:text-yellowDHNN">
                            Leer más
                          </a>
                        </Link>
                      </div>
                      <div className="w-full lg:w-1/2">
                        <figure className="rounded-[19px] lg:rounded-lg overflow-hidden">
                          <Image
                            src={ne.image.secure_url}
                            alt="Slider Noticias"
                            title="Slider Noticias"
                            className={styles.feature__icon}
                            objectFit="cover"
                            layout={"responsive"}
                            width={780}
                            height={736}
                            priority
                          />
                        </figure>
                      </div>
                    </article>
                  </SwiperSlide>
                )
              })}
            </>
          ) : (
            <>
              <p>No hay noticias!</p>
            </>
          )}
        </Swiper>
      ) : (
        <SkeletonHomeSliderNews />
      )}
    </div>
  )
}
