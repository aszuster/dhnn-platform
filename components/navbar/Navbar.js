import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { useContext } from "react"
import { contexto } from "components/context/ProjectsContext"

const Navbar = ({ activeMenu, toggleActiveMenu, subMenuAnimate }) => {
  const { setState } = useContext(contexto)
  const router = useRouter()

  const isActive = (path) => {
    return router.pathname === path ? "" : ""
  }
  return (
    <ul className="lg:flex hidden h-full lg:gap-3 xl:gap-4 text-base text-gris1 font-normal xl:pl-[40px] ">
      {/* EQUIPO */}
      <li
        className={`${isActive("/equipo")} relative flex h-full items-center`}
      >
        <Link href="/equipo">
          <a className="item-navbar rounded-[30px] mx-6 py-4 text-[13px] font-bold transition ease-in-out cursor-pointer">
            Drim tim
          </a>
        </Link>
      </li>
      {/* PROYECTOS */}
      <motion.li
        onHoverStart={() => toggleActiveMenu("proyectos")}
        onHoverEnd={() => toggleActiveMenu(null)}
        className={`${isActive(
          "/proyectos"
        )} relative flex h-full items-center`}
      >
        <Link href="/proyectos">
          <a href="" onClick={() => setState("All")}>
            <div className="item-navbar rounded-[30px] mx-6 py-4 text-[13px] font-bold transition ease-in-out cursor-pointer">
              Proyectos
            </div>
          </a>
        </Link>
        <motion.div
          initial="exit"
          animate={activeMenu === "proyectos" ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`absolute left-0  w-[208px]  top-[50px] bg-[#BCBCBC] h-auto rounded-[26px] z-10 p-6 dropdown`}
          >
            <div>
              <Link href="/proyectos">
                <a
                  onClick={() => setState("en_curso")}
                  className={`dropdown-link flex pb-[7px] text-sm font-bold items-center pl-2 pr-12 w-full text-black whitespace-nowrap hover:bg-gray-50 transition ease-in-out leading-[14px]`}
                >
                  En curso
                </a>
              </Link>
              <Link href="/proyectos">
                <a
                  onClick={() => setState("finalizados")}
                  className={`dropdown-link flex pt-[7px] text-sm font-bold items-center pl-2 pr-12 w-full text-black whitespace-nowrap hover:bg-gray-50 transition ease-in-out leading-[14px]`}
                >
                  Finalizados
                </a>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.li>
      {/* PEOPLE */}
      <li
        className={`${isActive("/people")} relative flex h-full items-center`}
      >
        <Link href="/people">
          <a className="item-navbar rounded-[30px] mx-6 py-4 text-[13px] font-bold transition ease-in-out cursor-pointer">
            Políticas y beneficios
          </a>
        </Link>
      </li>

      {/* OPERACIONES */}
      <li
        className={`${isActive(
          "/operaciones"
        )} relative flex h-full items-center`}
      >
        <Link href="/operaciones/section/646bb2ff0b3da9ea01e1ed4f">
          <a className="item-navbar rounded-[30px] mx-6 py-4 text-[13px] font-bold transition ease-in-out cursor-pointer">
            Way of work
          </a>
        </Link>
      </li>

      {/* RECURSOS */}
      <li
        className={`${isActive("/recursos")} relative flex h-full items-center`}
      >
        <Link href="/recursos">
          <a className="item-navbar rounded-[30px] mx-6 py-4 text-[13px] font-bold transition ease-in-out cursor-pointer">
            Recursos
          </a>
        </Link>
      </li>
    </ul>
  )
}

export default Navbar
