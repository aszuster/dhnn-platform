import FrontHeader from "components/headers/FrontHeader"

const withFrontDisplay =
  (Component, headerProps) =>
  ({ ...props }) => {
    return (
      <div
        className="h-screen justify-start overflow-auto bg-gris2  overflow-x-auto"
        style={{
          backgroundImage: "url('/images/brand/fondo1.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="desktop:max-w-[1300px] mx-auto">
          <FrontHeader {...headerProps} />
          <Component {...props} />
        </div>
      </div>
    )
  }

export default withFrontDisplay


