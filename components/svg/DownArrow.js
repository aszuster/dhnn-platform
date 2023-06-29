export default function DownArrow({ shown = false, width = 34, height = 35 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline ${!shown ? "rotate-0" : "rotate-180"}`}
    >
      <circle
        cx="16.9707"
        cy="17.4999"
        r="12"
        transform="rotate(45 16.9707 17.4999)"
        fill="#C4C4C4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5945 11.5159L17.5945 21.3125L20.6898 18.2171C20.9494 17.9576 21.0975 18.2486 21.3683 18.5195C21.6392 18.7904 21.9303 18.9384 21.6707 19.198L17.4407 23.4281C17.1811 23.6876 16.7511 23.6785 16.4802 23.4076L12.0663 18.9937C11.7954 18.7228 12.1423 18.5251 12.34 18.3274C12.5377 18.1297 12.7354 17.7828 13.0063 18.0537L16.2362 21.2836L16.2362 11.487L17.5945 11.5159Z"
        fill="#1C1C1C"
      />
    </svg>
  )
}
