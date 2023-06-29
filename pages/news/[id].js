import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { newsId } from "services/News"
import NewsRelated from "../home/News"
import DesignLayout from "components/layouts/DesignLayout"
import RelatedNews from "../news/relatedNews"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"
import NoUserImage from "components/svg/NoUserImage"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const News = ({ id }) => {
  const { data: data, isLoading: isLoading } = useQuery(["news", id], () =>
    newsId({ id })
  )
  const [newsDate, setNewsDate] = useState([])
  useEffect(() => {
    const date = data?.data.date
    setNewsDate(date)
  }, [isLoading])

  const optionsDay = {
    day: "2-digit",
  }
  const optionsMonth = {
    month: "long",
  }
  const optionsYear = {
    year: "numeric",
  }
  let day = new Date(newsDate).toLocaleDateString("es-ar", optionsDay)

  let month = new Date(newsDate).toLocaleDateString("es-ar", optionsMonth)

  let year = new Date(newsDate).toLocaleDateString("es-ar", optionsYear)

  return (
    <DesignLayout>
      <div className="md:relative">
        {/* firma desktop*/}

        <div className="flex pb-12 hidden md:block md:absolute left-[4rem] top-[6rem] z-50 3xl:left-[13rem]">
          <figure className="overflow-hidden w-[74px] h-[74px] mb-3 ">
            {data?.data.author.picture ? (
              <Image
                src={data?.data.author.picture}
                alt="Imagen Firma"
                title="Imagen Firma"
                layout="responsive"
                width="74px"
                height="74px"
                className="rounded-full"
              />
            ) : (
              <div className="rounded-full w-full h-full overflow-hidden">
                <NoUserImage />
              </div>
            )}
          </figure>
          <p className="text-sm font-normal">
            <span className="font-bold">{data?.data.author.userName}</span>
            <br />— {data?.data.author.area}
          </p>
        </div>
        {/* firma desktop fin */}
        <div className="pt-11 md:px-20 md:pt-0 pb-0 md:max-w-[100%]  md:mx-auto  md:pl-[3.5rem] 2xl:pl-[13.5rem] md:mt-0 md:pb-0">
          <div className="w-full px-6 bg-[#FFF] md:pl-[215px] md:relative">
            {data?.data.date ? (
              <div>
                <p className="font-bold text-sm pb-7 md:pb-[42px] capitalize">
                  {day} {month}, {year}
                </p>
              </div>
            ) : (
              <div>
                <p>No hay fecha</p>
              </div>
            )}

            <h1 className="font-bold text-[40px] md:text-[52px] leading-[46px] md:leading-[60px] pb-7 md:pb-[32px] xl:max-w-[80%] 3xl:max-w-[70%]">
              {data?.data.title}
            </h1>

            <p className="text-lg leading-[32px] pb-7 md:text-xl md:leading-[34px] md:max-w-[1100px] md:pb-[35px] xl:max-w-[80%] 3xl:max-w-[70%]">
              {data?.data.firstText}
            </p>
            <figure className="overflow-hidden mb-8 xl:max-w-[95%] 3xl:max-w-[87%]">
              {data?.data.image.secure_url && (
                <Image
                  src={data?.data.image.secure_url}
                  alt="Slider Noticias"
                  title="Slider Noticias"
                  objectFit="cover"
                  layout="responsive"
                  width={1195}
                  height={652}
                />
              )}
            </figure>

            {/* firma mobile */}
            <div className="flex pb-12 md:hidden">
              <figure className="overflow-hidden w-[36px] h-[36px] ">
                {data?.data.author.picture ? (
                  <Image
                    src={data?.data.author.picture}
                    alt="Imagen Firma"
                    title="Imagen Firma"
                    layout="responsive"
                    width="36px"
                    height="36px"
                  />
                ) : (
                  <div className="rounded-full w-full h-full overflow-hidden">
                    <NoUserImage />
                  </div>
                )}
              </figure>
              <p className="text-sm font-normal pl-2">
                <span className="font-bold">{data?.data.author.userName}</span>
                <br />— {data?.data.author.area}
              </p>
            </div>
            {/* firma mobile fin */}

            <p className="text-sm leading-[25px] pb-9 md:text-base md:leading-[32px] md:max-w-[1120px] xl:max-w-[90%] 2xl:max-w-[90%] 3xl:max-w-[85%] md:pb-[42px]">
              {data?.data.secondText}
            </p>
          </div>
        </div>
        <div className="bg-grayDHNN2 text-white px-6 py-12 md:py-[62px] md:pr-6 md:max-w-[100%]  md:mx-auto ">
          <p className="text-lg md:text-xl leading-[32px] md:leading-[32px] md:max-w-[100%]  xl:max-w-[90%] 2xl:max-w-[90%] 3xl:max-w-[85%] md:pl-[15.5rem] 2xl:pl-[25.5rem]">
            {data?.data.highlightedText}
          </p>
        </div>
        <div className="w-full px-6 bg-[#FFF] pt-9 md:pt-[42px] md:pr-6 pb-[58px] md:pb-[62px] md:max-w-[100%]">
          <p className="text-sm leading-[25px] md:text-base md:leading-[32px] md:max-w-[100%] md:pl-[15.5rem] 2xl:pl-[25.5rem] xl:max-w-[90%] 2xl:max-w-[90%] 3xl:max-w-[85%]">
            {data?.data.thirdText}
          </p>
        </div>

        <section className="pt-11 md:pt-14 pb-[30px] lg:pb-[70px] bg-[#F4F4F4] w-full px-6 md:max-w-[100%]">
          {/* LISTA DE NOTAS */}
          <div className="md:max-w-[100%]  md:pl-[15.5rem] 2xl:pl-[25.5rem]">
            <RelatedNews id={id} />
          </div>
        </section>
      </div>
    </DesignLayout>
  )
}

News.getInitialProps = async ({ query }) => {
  const { id } = query
  return {
    id,
  }
}

News.auth = true

export default News
