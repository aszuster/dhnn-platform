import React from "react"

export default function SkeletonHomeSliderNews() {
  return (
    <div role="status" className="animate-pulse">
      <div className="lg:flex max-w-[1255px] mx-auto">
        <div className="w-full lg:w-1/2 bg-grayDHNN rounded-[40px] mb-4 h-[300px] lg:h-[500px]"></div>
        <div className="w-full lg:w-1/2 bg-grayDHNN rounded-[40px] mb-4"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
