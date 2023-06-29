import Link from "next/link"
import LogoDHNN from "components/svg/LogoDHNN"

const Footer = () => {
  return (
    <footer className="footer pt-[100px] pb-[260px] md:pb-[100px] relative overflow-hidden p-12">
      <div className="star"></div>
      <div className="flex flex-wrap relative z-50 max-w-2xl px-6 mx-auto">
        <div className="w-full md:w-1/2 mb-12 md:mb-[0] md:ml-[-14px]">
          <Link href="/">
            <a>
              <LogoDHNN width={149} />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center md:items-end relative z-50 max-w-2xl px-6 mx-auto">
        <div className="w-1/2 border-right">
          <ul>
            <li className="md:inline-block md:mr-6">
              <a
                href="https://www.linkedin.com/company/dhnn/mycompany/"
                target="_blank"
                rel="noreferrer"
                className="fa fa-linkedin text-white text-2xl hover:text-black transition-all"
              ></a>
            </li>
            <li className="md:inline-block my-[41px] md:my-[0] md:mr-6">
              <a
                href="https://www.behance.net/dhnn"
                target="_blank"
                rel="noreferrer"
                className="fa fa-behance text-white text-2xl hover:text-black transition-all"
              ></a>
            </li>
            <li className="md:inline-block md:mr-6">
              <a
                href="https://www.instagram.com/dhnn_tm/"
                rel="noreferrer"
                target="_blank"
                className="fa fa-instagram text-white text-2xl hover:text-black transition-all"
              ></a>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap w-1/2">
          <div className="w-full md:w-1/3 border-left">
            <ul>
              <li>
                <Link href="/equipo">
                  <a className="text-xs hover:underline">Drim tim</a>
                </Link>
              </li>
              <li>
                <Link href="/proyectos">
                  <a className="text-xs hover:underline">Proyectos</a>
                </Link>
              </li>
              <li>
                <Link href="/people">
                  <a className="text-xs hover:underline">
                    Políticas y beneficios
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 border-left my-[130px] md:my-[0]">
            <ul>
              <li>
                <Link href="/operaciones">
                  <a className="text-xs hover:underline">Way of work</a>
                </Link>
              </li>
              <li>
                <Link href="/recursos">
                  <a className="text-xs hover:underline">Recursos</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 border-left"></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
