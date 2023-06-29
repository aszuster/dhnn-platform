import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import styles from "./index.module.css"
import { allActivities } from "services/Activities"
import { useQuery } from "@tanstack/react-query"
import { dateToString, timeToString } from "utils/dateEventToString"
import ButtonArrow from "components/buttons/ButtonArrow"
import SkeletonHomeActividades from "components/skeletons/home/SkeletonActividades"

export default function Activities() {
  const { data: CalendarEvents, isLoading } = useQuery(["activities"], () =>
    allActivities()
  )

  return (
    <section className="w-full max-w-2xl px-6 mx-auto sliderActivities relative mb-[56px] mt-[40px] lg:mt-[0]">
      {!isLoading ? (
        <>
          <h2 className="font-bold text-[32px] xl:text-[32px] relative lg:bottom-[-40px] xl:bottom-[-45px]">
            actividades <span className="font-thin text-grayDHNN">/</span>
          </h2>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            slidesPerView={1}
            navigation={true}
            breakpoints={{
              769: {
                slidesPerView: 1,
              },
              993: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={30}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {!isLoading ? (
              <div className="w-full overflow-hidden relative pt-16">
                <div className="flex w-full mt-[42px] mb-24 gap-[1.3rem] relative pt-16">
                  {!isLoading &&
                    CalendarEvents?.data.length > 0 &&
                    CalendarEvents?.data.map((eventsItem, index) => {
                      return (
                        <SwiperSlide key={eventsItem.id}>
                          <div className="flex-[0_0_90%] md:flex-[0_0_45%] w-full">
                            <article className="flex flex-wrap items-center p-8 border border-solid border-grayDHNN rounded-full relative">
                              <div className="w-1/6 sm:w-1/2">
                                <figure className="rounded-full overflow-hidden max-w-[275px] hidden sm:block">
                                  <Image
                                    src="/images/home/slider3.jpg"
                                    alt="Slider Actividades"
                                    title="Slider Actividades"
                                    className={styles.feature__icon}
                                    layout="responsive"
                                    width={275}
                                    height={275}
                                  />
                                </figure>
                              </div>
                              <div className="w-4/6 sm:w-1/2 pl-6 relative">
                                <p className="font-secondary text-8xl lg:text-8xl text-black relative mb-4">
                                  {dateToString(
                                    eventsItem.start.dateTime
                                  ).slice(0, 2)}
                                  <span className="text-base absolute pl-2">
                                    {dateToString(
                                      eventsItem.start.dateTime
                                    ).slice(2, 12)}
                                  </span>
                                </p>
                                <h2 className="font-bold text-sm lg:text-xl">
                                  {eventsItem.summary &&
                                    eventsItem.summary
                                      .split(" ")
                                      .slice(0, 5)
                                      .join(" ")}
                                  {eventsItem.summary &&
                                    eventsItem.summary.split(" ").length > 5 &&
                                    "..."}
                                </h2>
                                <p className="text-sm lg:text-sm mb-3">
                                  {timeToString(
                                    eventsItem.start.dateTime
                                  ).slice(0, 5)}
                                </p>
                                <p className="text-sm lg:text-sm mb-3 line-clamp-2">
                                  {eventsItem.description
                                    ? eventsItem.description
                                    : "No hay descripcion disponible"}
                                </p>
                              </div>
                              <div className="w-full p-2 absolute left-2 sm:left-0 bottom-[-40px] sm-bottom-[-30px] flex flex-row-reverse">
                                <div className="w-5/6 sm:w-1/2 pl-6 flex">
                                  <ButtonArrow
                                    href={
                                      eventsItem.location
                                        ? eventsItem.location
                                        : eventsItem.hangoutLink
                                    }
                                    text="Entrá a la reunión"
                                    theme="yellow"
                                  ></ButtonArrow>
                                </div>
                              </div>
                            </article>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                </div>
                {/* <div
            className={`md:absolute md:right z-50 md:top-1 w-full md:h-0 text-center md:text-right ${styles.buttons_embla_activities}`}
          >
            <div className="flex flex-wrap md:flex-row-reverse">
              <div className="w-full md:w-1/2 md:pl-20 pb-20 ">
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <span className="mx-2 text-xs relative top-[-7px] md:hidden">
                  1 / 4
                </span>
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
              </div>
            </div>
          </div> */}
              </div>
            ) : (
              <></>
            )}
          </Swiper>
        </>
      ) : (
        <SkeletonHomeActividades />
      )}
    </section>
  )
}
