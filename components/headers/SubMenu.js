import Link from "next/link"

export default function SubMenu({
  options,
  positionRelative,
  position = "left",
}) {
  return (
    <div
      className={`absolute w-[157px] top-[60px] ${
        position === "left" ? "-left-2" : position
      } bg-[#BCBCBC] h-auto rounded-[26px] z-10 p-[24px] ${
        positionRelative === "relative"
          ? "relative top-auto left-auto right-auto bottom-auto rounded-none p-0 !bg-transparent"
          : positionRelative
      }  `}
    >
      {options.map((item, i) => {
        return (
          <div key={`${item.label}-${i}`}>
            {item.link && (
              <Link href={item.link}>
                <a
                  className={`dropdown-link flex text-sm font-bold items-center pt-[7px] pl-2 pr-12 w-full text-black whitespace-nowrap hover:bg-gray-50 transition ease-in-out leading-[14px] ${
                    positionRelative === "relative"
                      ? "!text-white !p-0 text-[30px] mb-6 !font-sans !font-[400] leading-[45px] no-dropdown-link"
                      : positionRelative
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            )}
            {item.action && (
              <button
                key={i}
                className={` dropdown-link flex  text-sm font-bold items-center pb-[7px] pl-2 pr-12 w-full text-black whitespace-nowrap hover:bg-gray-50 transition ease-in-out leading-[14px] ${
                  positionRelative === "relative"
                    ? "!text-white !p-0 text-[30px] mb-6 !font-sans !font-[400] leading-[45px] no-dropdown-link"
                    : positionRelative
                }`}
                onClick={item.action}
              >
                {item.label}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
