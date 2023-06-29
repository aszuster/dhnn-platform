import React from "react"

const SkeletonProjectContent = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="grid md:grid-cols-2 md:gap-6 max-w-2xl px-6 mx-auto">
        <div className="bg-grayDHNN w-[100%] inline-block h-[472px]"></div>
        <div className="bg-grayDHNN w-[100%] inline-block h-[472px]"></div>
        <div className="bg-grayDHNN w-[100%] inline-block h-[472px]"></div>
        <div className="bg-grayDHNN w-[100%] inline-block h-[472px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SkeletonProjectContent
