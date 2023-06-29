import Link from "next/link"
import React from "react"
import Image from "next/image"

const CardProject = ({ id, title, state, category, image }) => {
  return (
    <Link href={`proyectos/${id}`}>
      <a
        className={`project
            ${state ? "proyecto-activo" : "proyecto-inactivo"}
      `}
      >
        <article className="flex flex-col md:flex-row gap-11 mb-6">
          {image ? (
            <figure className=" relative w-full md:w-[389px] h-[207px] md:h-[268px]">
              <Image
                src={image}
                alt={`Foto de ${title}`}
                layout="fill"
                objectFit="cover"
              />
            </figure>
          ) : (
            <div className="w-full md:w-[389px] h-[207px] md:h-[268px] bg-grayDHNN"></div>
          )}

          <div className="flex flex-col justify-center">
            <p className="text-base font-normal mb-3">{category}</p>
            <h1 className="text-grayDHNN2 text-4xl font-bold">{title}</h1>
            {state === "en_curso" ? (
              <p className="self-end md:self-start text-base md:mt-16 bg-yellowDHNN rounded-s w-fit px-5 py-3">
                En curso
              </p>
            ) : (
              <p className="self-end md:self-start text-base md:mt-16 bg-transparent border-solid border-[1px] border-[#CACACA] rounded-s w-fit px-5 py-3">
                Finalizado
              </p>
            )}
          </div>
        </article>
      </a>
    </Link>
  )
}

export default CardProject
