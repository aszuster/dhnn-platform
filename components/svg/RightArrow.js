export default function RightArrow({
  width = 42,
  height = 35,
  color = "currentColor",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.375797 15.4953L33.9326 14.7813L23.3299 4.17857C22.4407 3.28942 23.4378 2.78221 24.3656 1.85441C25.2934 0.926599 25.8006 -0.0704643 26.6898 0.818684L41.1793 15.3082C42.0684 16.1973 42.0371 17.6703 41.1093 18.5981L25.9898 33.7176C25.062 34.6454 24.3848 33.457 23.7076 32.7798C23.0304 32.1027 21.8421 31.4255 22.7699 30.4977L33.8337 19.4339L0.276806 20.1479L0.375797 15.4953Z"
        fill={color}
      />
    </svg>
  )
}
