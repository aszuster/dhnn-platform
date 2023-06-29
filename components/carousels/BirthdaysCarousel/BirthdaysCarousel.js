import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { allUsers } from "services/Users"
import styles from "./index.module.css"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { getNextBirthday } from "utils/getNextBirthday"

const wheelGesturesOptions = {
  wheelDraggingClass: "carousel-emblatico",
  forceWheelAxis: "y",
}

const BirthdaysCarousel = () => {
  const query = useQuery(["users"], allUsers)
  const [birthdaysArray, setBirthdaysArray] = useState([])
  const { data, isLoading, isError } = query
  useEffect(() => {
    const birthdays = data?.data
      .slice(0)
      .filter((item) => item.birthday !== undefined)
      .sort((a, b) => {
        return getNextBirthday(a.birthday) - getNextBirthday(b.birthday)
      })
    setBirthdaysArray(birthdays)
  }, [isLoading])

  const [emblaRef, embla] = useEmblaCarousel(
    {
      axis: "y",
      slidesToScroll: 1,
      align: "center",
    },
    [WheelGesturesPlugin(wheelGesturesOptions)]
  )

  const [emblaState, setEmblaState] = useState({
    slideActive: 0,
  })

  const onSelect = useCallback(() => {
    if (!embla) return
    setEmblaState({
      slideActive: embla.selectedScrollSnap(),
    })
  }, [embla])

  useEffect(() => {
    if (!embla) return
    embla.on("select", onSelect)
    onSelect()
  }, [embla, onSelect])

  const { slideActive } = emblaState
  return (
    <>
      {birthdaysArray?.length > 0 && !isLoading && birthdaysArray?.length ? (
        <>
          <div
            className="overflow-hidden w-full h-[400px] xl:h-[430px] flex items-center"
            ref={emblaRef}
          >
            <div className="flex flex-col w-full items-center p-2 carousel-emblatico">
              {birthdaysArray.map((item, index) => {
                const optionsDay = {
                  day: "2-digit",
                }
                const optionsMonth = {
                  month: "short",
                }
                let day = new Date(item.birthday).toLocaleDateString(
                  "es-ar",
                  optionsDay
                )

                let month = new Date(item.birthday).toLocaleDateString(
                  "es-ar",
                  optionsMonth
                )
                return (
                  <div
                    className={`${
                      styles.nede
                    } flex items-center w-full h-[120px] xl:h-[148px]  ${
                      index === slideActive && styles.slide__active
                    }`}
                    key={index}
                  >
                    {/* FECHA */}
                    <h1
                      className={`text-white font-secondary cursor-default transition-all duration-700  ${
                        index !== slideActive && "blur-[3px] ml-[30px]"
                      }`}
                    >
                      <b>{day}</b>

                      <br />

                      {month}
                    </h1>
                    {/* END FECHA */}
                    {/* NOMBRE */}
                    <h2
                      className={`text-white font-bold cursor-default text-[32px] lg:text-[42px] transition-all duration-700 ${
                        index !== slideActive &&
                        "blur-[3px] text-[32px] lg:text-[42px] w-[220px]"
                      }`}
                    >
                      {item.name}
                    </h2>

                    {/* END NOMBRE */}

                    {index === slideActive && (
                      <span className={styles.svg}>
                        <svg
                          width="41"
                          height="40"
                          viewBox="0 0 81 88"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M36.1259 0V10.5026L39.3151 40.3225C39.3121 40.3236 39.3091 40.3247 39.3061 40.3259L21.7716 16.9091L14.8782 9.48267L11.9524 12.6347L11.953 12.6355L8.80247 16.0296L15.6959 23.4561L37.458 42.0567C37.4494 42.0744 37.4409 42.0922 37.4326 42.11L9.74874 38.9192L0 38.9192V43.3763V43.3769V48.1769H9.74874L37.2237 44.7666C37.2362 44.8111 37.2495 44.8552 37.2636 44.8989L15.6953 63.6436L8.80194 71.0701L11.727 74.2213L11.7267 74.2216L14.8776 77.6162L21.771 70.1897L38.9019 46.9276C38.9551 46.9569 39.0091 46.9847 39.0639 47.0111L36.1261 76.5941V87.0967L40.2638 87.0967H44.7194V76.5941L41.5656 47.1049C41.6229 47.0824 41.6795 47.0583 41.7353 47.0326L59.074 70.1878L65.9674 77.6143L68.8932 74.4622L68.8925 74.4614L72.043 71.0673L65.1496 63.6408L43.4972 45.1339C43.5144 45.0905 43.5309 45.0465 43.5466 45.0022L71.0962 48.1776H80.8449V43.7199H80.8447V38.9198H71.096L43.5115 42.3438C43.5033 42.3226 43.495 42.3015 43.4865 42.2805L65.1498 23.4531L72.0432 16.0267L69.118 12.8753L69.1182 12.8751L65.9674 9.48053L59.074 16.907L41.7588 40.4194C41.7555 40.4179 41.7522 40.4163 41.7488 40.4148L44.7193 10.5026V0H40.582H40.5816H36.1259Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <p>No hay cumpleaños... 👀</p>
        </>
      )}
    </>
  )
}

export default BirthdaysCarousel
