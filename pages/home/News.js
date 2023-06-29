import React, { useState, useEffect, useCallback } from "react"

import CardNews from "components/cards/cardNews"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useAllNews } from "hooks/useNews"
import SkeletonHomeNovedades from "components/skeletons/home/SkeletonNovedades"

const News = () => {
  const { data, isLoading } = useAllNews()

  return (
    <section className="slider-novedades">
      {!isLoading ? (
        <>
          <h2 className="font-bold text-[32px] xl:text-[32px] relative lg:bottom-[-40px] xl:bottom-[-60px]">
            novedades
            <br className="lg:hidden" />
            <span className="font-thin text-grayDHNN"> / </span>
            <span className="text-grayDHNN">noticias</span>
          </h2>

          <Swiper
            pagination={{
              type: "fraction",
            }}
            slidesPerView={1}
            navigation={true}
            breakpoints={{
              769: {
                slidesPerView: 3,
              },
              993: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={30}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {data?.data.length > 0 && !isLoading ? (
              <>
                {data?.data.map((ne) => {
                  return (
                    <SwiperSlide key={ne._id} className="w-[334px]">
                      <div className="embla__slide w-full flex-[0_0_100%] lg: md:flex-[0_0_24%] ">
                        <article className="flex flex-col h-[500px] justify-between">
                          <CardNews
                            img={ne.image.secure_url}
                            date={ne.date}
                            title={ne.title}
                            author={ne.author.userName}
                            id={ne._id}
                          />
                        </article>
                      </div>
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
        </>
      ) : (
        <SkeletonHomeNovedades />
      )}
    </section>
  )
}

export default News
