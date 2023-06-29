import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"

import { allNews } from "services/News"
import { useQuery } from "@tanstack/react-query"
import styles from "./index.module.css"
import ButtonArrow from "components/buttons/ButtonArrow"
import CardNews from "components/cards/cardNews"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Link from "next/link"
import { useAllNews } from "hooks/useNews"

const News = ({ id }) => {
  const { data, isLoading } = useAllNews()
  const [relatedNews, setRelatedNews] = useState([])
  useEffect(() => {
    const filteredNews = data?.data.filter((news) => news._id !== id)
    setRelatedNews(filteredNews)
  }, [isLoading])

  return (
    <section className="slider-novedades">
      <h2 className="font-bold text-[32px] xl:text-[32px] relative lg:bottom-[-40px] xl:bottom-[-60px]">
        más novedades
        <span className="font-thin text-grayDHNN">
          {" "}
          <br className="lg:hidden" />/{" "}
        </span>
        <span className="text-grayDHNN">noticias</span>
      </h2>

      <div>
        {relatedNews?.length > 0 && !isLoading ? (
          <div className="hidden lg:flex flex-row gap-[22px] lg:mt-[107px]">
            {relatedNews.slice(0, 3).map((ne, index) => {
              return (
                <>
                  <div
                    key={ne._id}
                    className="hidden lg:block w-full flex-[0_0_100%] lg: md:flex-[0_0_24%] "
                  >
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
                </>
              )
            })}
          </div>
        ) : (
          <>
            <p>No hay noticias!</p>
          </>
        )}
      </div>
      <div className="lg:hidden">
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
          {relatedNews?.length > 0 && !isLoading ? (
            <div className=" flex flex-row gap-[34px] lg:mt-[107px]">
              {relatedNews.slice(0, 3).map((ne, index) => {
                return (
                  <>
                    <SwiperSlide key={ne._id} className="!w-[334px] lg:hidden">
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
                  </>
                )
              })}
            </div>
          ) : (
            <>
              <p>No hay noticias!</p>
            </>
          )}
        </Swiper>
      </div>
    </section>
  )
}

export default News
