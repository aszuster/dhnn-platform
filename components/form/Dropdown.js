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
    },
    transitionEnd: {
      display: "none",
    },
  },
}

const Dropdown = ({ label, value, setValue, options }) => {
  const [shown, setShown] = useState(false)
  return (
    <div>
      {value && <p className="text-[#212121] text-sm mb-2">{label}</p>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShown(!shown)}
          className="w-full flex justify-between bg-transparent text-[40px] text-negro1 border-b-solid border-b-[1px] border-grayDHNN2 py-[3px] px-4"
        >
          {value ? value : label}
          <DownArrow width={50} height={50} shown={shown} />
        </button>
        <motion.ul
          variants={showSubMenu}
          initial="exit"
          animate={shown ? "enter" : "exit"}
          className="w-full md:absolute z-10 bg-white shadow-lg rounded-[12px] mt-1 text-sm text-center text-grayDHNN2 border-solid border-[1px] border-grayDHNN2 md:border-none"
        >
          <li className="font-bold text-lg p-2">All</li>
          <hr className="w-full border-solid border-b-[-2.5px] border-grayDHNN" />
          {options?.map((option, index, array) => {
            return (
              <div key={index}>
                <li
                  className="cursor-pointer text-lg p-2 hover:bg-grayDHNN"
                  onClick={() => {
                    setValue(option.value)
                    setShown(false)
                  }}
                >
                  {option.label}
                </li>
                {array.length - 1 !== index && (
                  <hr className="w-full border-solid border-b-[-2.5px] border-grayDHNN" />
                )}
              </div>
            )
          })}
        </motion.ul>
      </div>
    </div>
  )
}

export default Dropdown
