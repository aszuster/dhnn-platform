import HeaderMenu from "components/headers/HeaderMenu"
import Footer from "components/footer/Footer"

export default function AdminLayout(props) {
  return (
    <div
      className="h-screen justify-start overflow-auto bg-gris2 sm-min-w-[100%] md-min-w-[768] xl-max-w-[1300px] overflow-x-auto pt-14"
      style={{
        backgroundImage: "url('/images/brand/fondo1.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <HeaderMenu />
      {props.children}
      <Footer />
    </div>
  )
}
