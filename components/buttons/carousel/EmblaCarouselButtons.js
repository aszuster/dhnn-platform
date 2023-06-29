import styles from "./index.module.css"

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className={`rounded-xs transition-all px-3 py-3 m-1 cursor-pointer bg-black`}
    onClick={onClick}
    disabled={!enabled}
  >
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.25 12.2743h15M10.2998 18.2987l-6.05-6.024 6.05-6.02501"
        className="stroke-white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
)

export const NextButton = ({ enabled, onClick }) => (
  <button
    className={`rounded-xs transition-all px-3 py-3 cursor-pointer bg-black`}
    onClick={onClick}
    disabled={!enabled}
  >
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.75 11.7257h-15M13.7002 5.70131l6.05 6.02399-6.05 6.025"
        className="stroke-white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
)

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
)

export const PrevButtonCircle = ({ enabled, onClick }) => (
  <button
    className={`rounded-xs transition-all hover:pr-14 px-5 py-3 cursor-pointer bg-white`}
    onClick={onClick}
    disabled={!enabled}
  >
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.25 12.2743h15M10.2998 18.2987l-6.05-6.024 6.05-6.02501"
        className="stroke-black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
)

export const NextButtonCircle = ({ enabled, onClick }) => (
  <button
    className={`rounded-xs transition-all hover:pl-14 px-5 py-3 cursor-pointer bg-white ${styles.embla__button} ${styles.embla__button__next} ${styles.embla__button__next} ${styles.embla__buttonCircle}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.75 11.7257h-15M13.7002 5.70131l6.05 6.02399-6.05 6.025"
        className="stroke-black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
)
