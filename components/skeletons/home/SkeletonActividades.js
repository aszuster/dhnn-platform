import React from "react"

export default function SkeletonHomeActividades() {
  return (
    <div role="status" className="animate-pulse">
      <div className="h-8 bg-grayDHNN max-w-[360px] mb-8 mt-[40px]"></div>
      <div className="lg:flex h-[500px] justify-between">
        <div className="w-full lg:w-1/2">
          <div className="bg-grayDHNN mb-2.5 rounded-full w-full lg:max-w-[97%] inline-block h-[380px]"></div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="bg-grayDHNN mb-2.5 rounded-full w-full lg:max-w-[97%] inline-block h-[380px]"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
