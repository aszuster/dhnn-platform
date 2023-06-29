import React from "react"

export default function SkeletonHomeNovedades() {
  return (
    <div role="status" className="animate-pulse">
      <div className="h-6 bg-grayDHNN max-w-[360px] mb-4 mt-[40px]"></div>
      <div className="lg:flex h-[500px] justify-between">
        <div className="w-full lg:w-1/4">
          <div className="bg-grayDHNN mb-2.5 w-full lg:max-w-[334px] inline-block h-[280px]"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[200px] mb-4"></div>
          <span className="bg-grayDHNN rounded-[50px] w-[200px] h-[50px] inline-block"></span>
          <span className="bg-grayDHNN rounded-full w-[50px] h-[50px] inline-block"></span>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="bg-grayDHNN mb-2.5 w-full lg:max-w-[334px] inline-block h-[280px]"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[200px] mb-4"></div>
          <span className="bg-grayDHNN rounded-[50px] w-[200px] h-[50px] inline-block"></span>
          <span className="bg-grayDHNN rounded-full w-[50px] h-[50px] inline-block"></span>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="bg-grayDHNN mb-2.5 w-full lg:max-w-[334px] inline-block h-[280px]"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[200px] mb-4"></div>
          <span className="bg-grayDHNN rounded-[50px] w-[200px] h-[50px] inline-block"></span>
          <span className="bg-grayDHNN rounded-full w-[50px] h-[50px] inline-block"></span>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="bg-grayDHNN mb-2.5 w-full lg:max-w-[334px] inline-block h-[280px]"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[290px] mb-2.5"></div>
          <div className="h-5 bg-grayDHNN rounded-full max-w-[200px] mb-4"></div>
          <span className="bg-grayDHNN rounded-[50px] w-[200px] h-[50px] inline-block"></span>
          <span className="bg-grayDHNN rounded-full w-[50px] h-[50px] inline-block"></span>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
