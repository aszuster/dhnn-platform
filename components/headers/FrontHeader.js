import LogoDHNN from "components/svg/LogoDHNN"
import RightArrow from "components/svg/RightArrow"
import Link from "next/link"

const ADMIN_LINK = process.env.NEXT_PUBLIC_ADMIN_LINK

export default function FrontHeader({ first, linkFirst, second }) {
  return (
    <div>
      <div className="mt-16 ml-24">
        <LogoDHNN width={70} />
        <div className="flex items-end mt-4">
          {first ? (
            <Link href={`/`}>
              <a className="relative flex items-end">
                {/* <div className="absolute text-amarillo left-[-26px] -rotate-90 mr-4">
                  <RightArrow width={14} />
                </div> */}
                <h1 className="text-negro1 text-5xl font-semibold select-none">
                  front{" "}
                  <span className="text-blanco1 selection:text-negro1">
                    zone
                  </span>
                </h1>
              </a>
            </Link>
          ) : (
            <h1 className="text-negro1 text-5xl font-semibold selection:bg-amarillo selection:text-negro2">
              admin{" "}
              <span className="text-blanco1 selection:text-negro1">zone</span>
            </h1>
          )}

          {first && !second && (
            <div className="flex items-center ml-4 select-none text-gris1">
              <RightArrow width={14} />
              <h4 className="text-md font-medium ml-4">{first}</h4>
            </div>
          )}
          {first && second && (
            <>
              <Link href={`/${ADMIN_LINK}/${linkFirst}`}>
                <a className="flex items-center ml-4 select-none hover:underline hover:underline-offset-4">
                  <RightArrow width={14} />
                  <h4 className="text-md font-medium ml-4">{first}</h4>
                </a>
              </Link>
              <div className="flex items-center ml-4 text-gris1 select-none">
                <RightArrow width={14} />
                <h4 className="text-md font-medium ml-4">{second}</h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
