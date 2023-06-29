import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import UserInfoBox from "components/boxes/UserInfoBox"
import LogoDHNN from "components/svg/LogoDHNN"

const ADMIN_LINK = process.env.NEXT_PUBLIC_ADMIN_LINK

export default function AdminDashboard({ children }) {
  const { data: session } = useSession()
  const router = useRouter()
  const userName = session?.user?.name
  const [show, setShow] = useState(false)

  return (
    <>
      <div
        className="lg:flex h-screen justify-start overflow-auto bg-gris2 z-0"
        style={{
          backgroundImage: "url('/images/brand/fondo1.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <button
          onClick={() => setShow(!show)}
          className={`${
            show ? "activeButton" : ""
          } border border-black buttonpanel absolute left-[10px!important] top-4 bg-white text-yellow-700 z-50 lg:hidden w-[40px] h-[40px] rounded-full`}
        >
          <span className="h-[3px] mb-[5px] bg-black block w-[18px] mx-auto"></span>
          <span className="h-[3px] mt-[5px] bg-black block w-[18px] mx-auto"></span>
        </button>

        <div
          className={`${
            show ? "active" : ""
          } panel absolute left-[-1000px] h-[100vh] lg:relative bg-grayDHNN2 p-10 z-[9px] lg:left-[0px]`}
        >
          <div className="h-full flex flex-col justify-between text-white">
            <div>
              <Link href="/">
                <a>
                  <LogoDHNN width={96} color={"#FFFFFF"} />
                </a>
              </Link>
              <span className="text-xs text-grayDHNN  font-normal">
                Onboarding
              </span>
            </div>

            {/* MENU */}
            <div className="flex-1  mt-14 text-2xl text-negro1 font-medium">
              {/* <h5 className=" mb-4 text-grayDHNN  text-lg font-medium">
                ¿Qué desea gestionar?
              </h5> */}
              <Link href={`/${ADMIN_LINK}/users`}>
                <a
                  className={`w-max block text-4xl mt-4 mb-6  ${
                    router.pathname === "/admin/users"
                      ? "text-white"
                      : "text-grayDHNN3"
                  }`}
                >
                  Equipo
                </a>
              </Link>
              <Link href={`/${ADMIN_LINK}/projects`}>
                <a
                  className={`w-max block text-4xl mt-4 mb-6  ${
                    router.pathname === "/admin/projects"
                      ? "text-white"
                      : "text-grayDHNN3"
                  }`}
                >
                  Proyectos
                </a>
              </Link>
              <Link href={`/${ADMIN_LINK}/news`}>
                <a
                  className={`w-max block text-4xl mt-4 mb-6  ${
                    router.pathname === "/admin/news"
                      ? "text-white"
                      : "text-grayDHNN3"
                  }`}
                >
                  Novedades
                </a>
              </Link>
              <Link href={`/${ADMIN_LINK}/operations`}>
                <a
                  className={`w-max block text-4xl mt-4 mb-6  ${
                    router.pathname === "/admin/operations"
                      ? "text-white"
                      : "text-grayDHNN3"
                  }`}
                >
                  Operaciones
                </a>
              </Link>
            </div>

            {/* SALIR */}
            <UserInfoBox session={session} userName={userName} reverse={true} />
          </div>
        </div>
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </>
  )
}

AdminDashboard.auth = "admin"
