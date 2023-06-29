import { motion } from "framer-motion"

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

export const ToggleButton = ({ toggle, isOpen }) => {
  return (
    <button
      onClick={toggle}
      className={`relative top-0 right-0 p-5 rounded-full ${
        !isOpen
          ? "border-solid border-[1px] border-grayDHNN "
          : "bg-yellowDHNN !fixed top-[30px] right-[24px] border-solid border-[1px] border-yellowDHNN"
      }`}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  )
}
