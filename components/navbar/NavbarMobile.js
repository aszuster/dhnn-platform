import { ToggleButton } from "components/buttons/ToggleButton"
import { motion, useCycle } from "framer-motion"
import { useRef } from "react"
import NavigationMobile from "./NavigationMobile"
import { useContext, useState } from "react"
import { contexto } from "components/context/OperationsContext"

const sidebar = {
  open: () => ({
    clipPath: `circle(${1000 * 2 + 200}px at 40px 40px)`,
    background: "#1C1C1C",

    transition: {
      type: "spring",
      delay: 0.03,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 355px 65px)",
    background: "rgba(255,255, 255, 0)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

const NavbarMobile = () => {
  const resultado = useContext(contexto)
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className="lg:hidden z-10"
    >
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-full !h-[120%]"
        variants={sidebar}
      />
      {/* <Navigation />*/}
      <NavigationMobile isOpen={isOpen} />
      <div
        className={`${
          resultado?.visible === true ? "hidden" : "" // Aplica la clase 'hidden' si el submenu está abierto
        }`}
      >
        <ToggleButton toggle={() => toggleOpen()} isOpen={isOpen} />
      </div>
    </motion.div>
  )
}

export default NavbarMobile
