import Link from "next/link"
import React, { useState } from "react"
import DownArrow from "components/svg/DownArrow"
import { motion } from "framer-motion"
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
      delay: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
}

const DropdownFilter = ({ options, label, value }) => {
  const [shown, setShown] = useState(false)
  return (
    <div className="relative">
      <motion.button
        onClick={() => setShown(!shown)}
        className="w-full md:w-max bg-transparent text-sm rounded-xs border-solid border-[1px] border-grayDHNN py-[4px] px-4"
      >
        {value ? value : label}
        <DownArrow width={25} height={25} shown={shown} />
      </motion.button>
      <motion.ul
        onMouseLeave={() => setShown(!shown)}
        variants={showSubMenu}
        initial="exit"
        animate={shown ? "enter" : "exit"}
        className="w-full md:w-max left-0 md:absolute bg-grayDHNN rounded-[26px] mt-1 px-6 py-6 text-sm text-left text-grayDHNN2"
      >
        {options?.map((item, index) => {
          return (
            <li
              className={`cursor-pointer p-2 hover:font-bold transition-all `}
              key={index}
            >
              <Link href="">
                <a
                  className="text-sm leading-[14px]"
                  onClick={() => [item.setValue()]}
                >
                  {item.label}
                </a>
              </Link>
            </li>
          )
        })}
      </motion.ul>
    </div>
  )
}

export default DropdownFilter
