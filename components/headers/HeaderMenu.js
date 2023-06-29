import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
// Components
import LogoDHNN from "components/svg/LogoDHNN"
import NoUserImage from "components/svg/NoUserImage"
import SubMenu from "components/headers/SubMenu"
import Navbar from "components/navbar/Navbar"
import NavbarMobile from "components/navbar/NavbarMobile"

const darkToastMsg = (msg) =>
  toast(msg, {
    icon: "🛠",
    style: {
      borderRadius: "4px",
      background: "#333",
      color: "#fff",
    },
  })

export default function HeaderMenu() {
  const { data: session, status } = useSession()
  const userName = session?.user?.name

  const [activeMenu, setActiveMenu] = useState(null)
  const toggleActiveMenu = (itemToActive) => {
    setActiveMenu(itemToActive)
  }
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      transition: { duration: 0.05, delay: 0.1 },
      display: "block",
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.05, delay: 0.3 },
      transitionEnd: {
        display: "none",
      },
    },
  }
  return (
    <div className="bg-white pt-[30px] pb-[46px] lg:pt-[25px] lg:pb-[80px]">
      <div className="flex h-[65px] lg:h-[auto] items-center justify-between xl:max-w-[1308px] 2xl:max-w-[1440px] mx-auto px-6">
        {/* LOGO */}
        <Link href="/">
          <a>
            <LogoDHNN width={96} />
          </a>
        </Link>

        {/* MENU */}
        <Navbar
          activeMenu={activeMenu}
          toggleActiveMenu={toggleActiveMenu}
          subMenuAnimate={subMenuAnimate}
        />
        <NavbarMobile />
        {/* PERFIL */}
        {status === "loading" && (
          <div className="animate-pulse">
            <div className="flex items-center gap-3">
              <div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mt-2"></div>
              </div>
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <svg
                  className="w-full h-full text-gray-200 dark:text-gray-700"
                  // aria-hidden="true"
                  fill="currentColor"
                  viewBox="2 2 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        )}
        {status === "authenticated" && (
          <motion.div
            onHoverStart={() => toggleActiveMenu("perfil")}
            onHoverEnd={() => toggleActiveMenu(null)}
            className="relative lg:flex hidden h-full items-center justify-end cursor-pointer"
          >
            <p className="font-bold mr-3 text-sm">
              {userName && userName.split(" ")[0]}
              <font className="block font-light text-xs text-gris1 text-right">
                {session?.user.role}
              </font>
            </p>
            <div className="relative h-12 w-12 rounded-full border-2 border-gris3">
              {session?.user.picture?.secure_url ? (
                <Image
                  className="rounded-full"
                  src={session?.user?.picture.secure_url}
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
            <motion.div
              initial="exit"
              animate={activeMenu === "perfil" ? "enter" : "exit"}
              variants={subMenuAnimate}
            >
              <SubMenu
                position="right-0"
                options={[
                  { label: "Cerrar sesión", action: () => signOut() },
                  { label: "Admin", link: "/admin/users" },
                ]}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
