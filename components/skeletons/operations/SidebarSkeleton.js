import React from "react"

const SidebarSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="h-3 bg-grayDHNN3 rounded-full  w-64 mb-2"></div>
      <div className="h-3 bg-grayDHNN3 rounded-full  w-48 mb-2"></div>
      <div className="h-3 bg-grayDHNN3 rounded-full  w-64 mb-2"></div>
      <div className="h-3 bg-grayDHNN3 rounded-full  w-48 mb-2"></div>
      <div className="h-3 bg-grayDHNN3 rounded-full  w-64 mb-2"></div>
      <div className="h-3 bg-grayDHNN3 rounded-full  w-48 mb-2"></div>
    </div>
  )
}

export default SidebarSkeleton
