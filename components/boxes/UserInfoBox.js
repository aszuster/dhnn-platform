import NoUserImage from "components/svg/NoUserImage"
import SignOut from "components/svg/SignOut"
import Image from "next/image"
import React from "react"
import { signOut } from "next-auth/react"

const UserInfoBox = ({ session, userName, reverse }) => {
  return (
    <div className="zindex flex flex-row items-center gap-6">
      <div
        className={`relative lg:flex ${
          reverse ? " flex-row-reverse gap-2" : ""
        } hidden items-center justify-end`}
      >
        <p className="font-bold tracking-wide mr-3">
          {userName && userName.split(" ")[0]}
          <font className="block font-light text-xs text-gris1">
            {session?.user?.role}
          </font>
        </p>
        <div className="relative h-12 w-12 rounded-full border-2 border-gris3">
          {session?.user?.picture?.secure_url ? (
            <Image
              className="rounded-full"
              src={session?.user?.picture?.secure_url}
              alt={`Foto de ${session?.user?.name}`}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden">
              <NoUserImage />
            </div>
          )}
        </div>
      </div>
      <SignOut action={() => signOut()} />
    </div>
  )
}

export default UserInfoBox
