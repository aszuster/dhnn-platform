import React from "react"
import Image from "next/image"
import PrimaryButton from "components/buttons/PrimaryButton"
import { Router, useRouter } from "next/router"

const Card = ({image, title, copy, copy_link, link}) => {
    const router = useRouter()
  return (
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
            <Image 
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                alt={`example people`}
                layout="responsive"
                width={720}
                height={400}
                objectFit="cover"
                src="https://dummyimage.com/720x400"
            />
            <div className="p-6 bg-blanco1">
                <h1 className="title-font font-bold text-gray-900 mb-3 text-xl">{title}</h1>
                <p className="leading-relaxed mb-3">{copy}</p>
                <div className="flex items-center flex-wrap ">
                    <PrimaryButton
                        text={copy_link}
                        action={() => router.push(link)}
                        theme="primary"
                        classes="w-auto"
                    />
                </div>
            </div>
        </div>
  )
}

export default Card
