import { useContext, useState } from "react"
import Sidebar from "components/Sidebar/Sidebar"
import { contexto } from "components/context/OperationsContext"

export default function NavbarOperaciones() {
  const resultado = useContext(contexto)
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  return (
    <>
      <div
        className={`${
          show
            ? "left-[0] right-[0] top-[0] bottom-[0] z-[9999999] nav-overflow"
            : ""
        } panel pt-[20px] top-[-176px] absolute left-[-1000px] h-[100vh] lg:relative lg:p-10 z-[9px] bg-[#F4F4F4] lg:hidden`}
      >
        <button
          onClick={() => {
            resultado.setVisible(false)
            setShow(!show)
          }}
          className="absolute top-[40px] left-[18px] font-bold rounded-full border border-grayDHNN px-4 py-2 lg:hidden z-[9999999]"
        >
          Volver
          <i className="bg-gray not-italic rounded-full inline-block align-middle text-center pt-[7px] w-[20px] h-[20px] ml-2 relative top-[-2px]">
            <span className="bg-black mx-auto block w-[10px] h-[2px] mb-[2px] rotate-[45deg] relative top-[2px]"></span>
            <span className="bg-black mx-auto block w-[10px] h-[2px] mt-[2px] rotate-[-45deg] relative top-[-2px]"></span>
          </i>
        </button>
        <Sidebar />
      </div>
      <button
        onClick={() => {
          resultado.setVisible(true)
          setShow(!show)
        }}
        className="bg-white absolute left-[20px] font-bold rounded-full border border-grayDHNN px-4 py-2 lg:hidden"
      >
        <i className="bg-gray not-italic rounded-full inline-block align-middle text-center pt-[7px] w-[20px] h-[20px] mr-2 relative top-[-2px]">
          <span className="bg-black mx-auto block w-[10px] h-[2px] mb-[2px]"></span>
          <span className="bg-black mx-auto block w-[10px] h-[2px] mt-[2px]"></span>
        </i>
        Menu
      </button>
    </>
  )
}
