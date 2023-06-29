import HeaderMenu from "components/headers/HeaderMenu"
import Footer from "components/footer/Footer"
import { MiProvider } from "components/context/OperationsContext"

export default function DesignLayout(props) {
  return (
    <div className="w-full h-screen justify-start overflow-auto bg-blanco1">
      <MiProvider>
        <HeaderMenu />
        {props.children}
        <Footer />
      </MiProvider>
    </div>
  )
}
