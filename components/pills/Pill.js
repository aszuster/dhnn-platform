import XMark from "components/svg/XMark"
import React from "react"

const Pill = ({ selectedArea, setSelectedArea, area, label }) => {
  return (
    <div
      className={`${
        selectedArea === area
          ? "bg-black text-white"
          : "bg-white hover:bg-yellowDHNN"
      } inline-flex items-center transition-all rounded-full border border-solid border-black mb-3 xl:mb-0 mr-3 py-[15px] px-[24px] leading-5`}
    >
      <p
        className={`text-sm font-bold ${
          selectedArea === area ? "cursor-default" : " cursor-pointer"
        }`}
        onClick={() => setSelectedArea(area)}
      >
        {label}
      </p>
      {selectedArea === area && selectedArea !== "Todos" && (
        <XMark action={() => setSelectedArea("Todos")} />
      )}
    </div>
  )
}

export default Pill
