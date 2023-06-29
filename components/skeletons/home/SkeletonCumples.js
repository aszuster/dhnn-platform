import React from "react"

export default function SkeletonHomeCumples() {
  return (
    <div role="status" className="animate-pulse">
      <div className="flex h-[500px] justify-between">
        <div className="w-full">
          <div className="bg-grayDHNN w-full block h-[580px]"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
