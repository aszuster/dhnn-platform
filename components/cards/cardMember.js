import Image from "next/image"
import NoUserImage from "components/svg/NoUserImage"

const MemberId = ({ user }) => {
  return (
    <div className="w-full bg-blanco1 mb-12 lg:mb-3">
      <figure className="relative mb-6 grayscale">
        {user.picture?.secure_url ? (
          <Image
            src={user.picture.secure_url}
            width={500}
            height={500}
            alt={`Foto de ${user?.name}`}
            layout={"responsive"}
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full overflow-hidden ">
            <NoUserImage />
          </div>
        )}
      </figure>
      <h4 className="font-bold text-3xl lg:text-2xl mb-1 lg:mb-2">
        {user?.name}
      </h4>
      <h4 className="text-base mb-3 lg:mb-4">
        {user?.occupation} / {user?.email}
        {/* {user?.subOccupation.length > 0 && (
          <span className="bg-amarillo py-1 px-3 ml-1 rounded-1 text-xs">
            {user?.subOccupation}
          </span>
        )} */}
      </h4>
      <a
        href={user?.profile_link}
        target="_blank"
        rel="noreferrer"
        className="text-gris1 font-light text-sm leading-[25px]"
      >
        Conocé más mirando su ficha de Figma acá.
      </a>
    </div>
  )
}

export default MemberId
