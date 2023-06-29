import Image from "next/image"

export default function NoUserImage() {
  return (
    <Image
      className="w-[10px] h-[120px]"
      src="/images/brand/logo-white.svg"
      alt={`Foto de`}
      layout="fill"
      objectFit="cover"
    />
  )
}
