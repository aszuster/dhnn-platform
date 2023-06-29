import Link from "next/link"
import { motion } from "framer-motion"
import LogoDHNN from "components/svg/LogoDHNN"
import { useContext, useState } from "react"
import DownArrow from "components/svg/DownArrow"
import { contexto } from "components/context/ProjectsContext"
import { signOut, useSession } from "next-auth/react"
import SubMenu from "components/headers/SubMenu"
import NoUserImage from "components/svg/NoUserImage"
import Image from "next/image"
import UserInfoBox from "components/boxes/UserInfoBox"

const showSubMenu = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
}
const NavigationMobile = ({ isOpen }) => {
  const [shown, setShown] = useState(false)
  const { setState } = useContext(contexto)
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
    <div
      className={`${
        !isOpen ? "hidden" : "block"
      } absolute top-[47px] left-[2px] pl-[22px] pr-[63px]`}
    >
      <Link href="/">
        <a>
          <LogoDHNN width={96} color={"#FFFFFF"} />
        </a>
      </Link>
      <motion.ul className="mt-[71px]">
        <Link href="/equipo">
          <li className="text-[30px] mb-6 text-white">Drim tim</li>
        </Link>
        <li>
          <motion.div onClick={() => setShown(!shown)} className="mb-6">
            <span className="cursor-pointer text-[30px] text-white">
              Proyectos
              <DownArrow />
            </span>
            <motion.ul
              variants={showSubMenu}
              initial="exit"
              animate={shown ? "enter" : "exit"}
              className="mt-1"
            >
              <li className="cursor-pointer p-1 text-white text-xl">
                <Link href="/proyectos">
                  <a href="" onClick={() => setState("en_curso")}>
                    En curso
                  </a>
                </Link>
              </li>

              <li className="cursor-pointer p-1 text-white text-xl">
                <Link href="/proyectos">
                  <a href="" onClick={() => setState("finalizados")}>
                    Finalizados
                  </a>
                </Link>
              </li>
            </motion.ul>
          </motion.div>
        </li>
        <Link href="/people">
          <li className="text-[30px] mb-6 text-white">
            Políticas y beneficios
          </li>
        </Link>
        <Link href="/operaciones/section/646bb2ff0b3da9ea01e1ed4f">
          <li className="text-[30px] mb-6 text-white">Way of work</li>
        </Link>
        <Link href="/recursos">
          <li className="text-[30px] mb-6 text-white">Recursos</li>
        </Link>
      </motion.ul>
      {status === "authenticated" && (
        <div className="box-mobile-session">
          <SubMenu
            position="right-0"
            positionRelative="relative"
            options={[
              { label: "Cerrar sesión", action: () => signOut() },
              { label: "Admin", link: "/admin/users" },
            ]}
          />
          {/* imagen y datos */}
          <motion.div
            // onHoverStart={() => toggleActiveMenu("perfil")}
            // onHoverEnd={() => toggleActiveMenu(null)}
            className="flex items-center mt-[81px]"
          >
            <div className="relative h-[42px] w-[42px] rounded-full border-2 border-gris3 mr-3">
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
            <p className="font-bold text-white text-[21px] leading-6">
              {userName && userName.split(" ")[0]}
              <font className="block text-xs font-sans text-[17px] leading-6">
                {session?.user.role}
              </font>
            </p>
          </motion.div>
          {/* deslogueo */}
        </div>
      )}
    </div>
  )
}

export default NavigationMobile
