import React from "react"

const TableItemSkeleton = () => {
  return (
    <tr className="border-t-[1px] border-grayDHNN animate-pulse">
      <td className="px-8 py-4">
        <div className="flex items-center">
          <div className="relative h-14 w-14 mr-6">
            <svg
              className="text-grayDHNN w-14 h-14"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <div className="h-2.5 bg-grayDHNN rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-grayDHNN rounded-full"></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="h-2.5 bg-grayDHNN rounded-full  w-32 mb-2"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-2.5 bg-grayDHNN rounded-full  w-32 mb-2"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-2.5 bg-grayDHNN rounded-full  w-32 mb-2"></div>
      </td>
      <td className="px-4 py-4 capitalize">
        <div className="h-2.5 bg-grayDHNN rounded-full  w-32 mb-2"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-2.5 bg-grayDHNN rounded-full w-12"></div>
      </td>
    </tr>
  )
}

export default TableItemSkeleton
