import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"

import { allNews } from "services/News"
import { newsId } from "services/News"
import { useQuery } from "@tanstack/react-query"
import styles from "../../pages/home/index.module.css"

import ButtonArrow from "components/buttons/ButtonArrow"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Link from "next/link"
import { useAllNews } from "hooks/useNews"

const cardNews = ({ id, img, date, title, author }) => {
  return (
    <>
      <div className="max-w-[334px]">
        <Image
          src={img}
          alt="Slider Noticias"
          title="Slider Noticias"
          objectFit="cover"
          layout={"responsive"}
          width={334}
          height={268}
          className="max-w-[100%]"
        />
        <p className="text-sm pt-[24px] font-secondary">
          Branding | Design | {date}
        </p>
        <h3 className="text-2xl font-bold leading-[35px] pt-[10px]">
          <Link href={`news/${id}`}>
            <a className="text-2xl font-bold pt-[10px]">{title}</a>
          </Link>
        </h3>

        <p className="text-base pt-[6px]">Por {author}</p>
      </div>
      <div>
        <div className="mt-[24px]  items-center hidden lg:block">
          <ButtonArrow
            href={`news/${id}`}
            text="Leer novedad"
            theme="black"
          ></ButtonArrow>
        </div>
      </div>
    </>
  )
}

export default cardNews
