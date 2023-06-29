import svgs from "components/svg"

const Icon = ({ svg, classes, title }) => {
  const svgRender = svgs[svg] || svgs.default
  return (
    <>
      {svgRender?.svg && (
        <svg
          viewBox={svgRender?.viewBox}
          className={classes}
          title={title}
          xmlns="http://www.w3.org/2000/svg"
        >
          {svgRender?.svg}
        </svg>
      )}
    </>
  )
}

export default Icon
