import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

export default function SimpleImageCarousel({ images }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
      <div className="flex flex-col embla__container w-full h-full">
        {images.map((image, i) => (
          <div
            key={i}
            className="flex-[0_0_100%] embla__slide h-full w-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </div>
  )
}
