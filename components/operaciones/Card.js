import Link from "next/link"
import styles from "./index.module.css"

const Card = ({ title, copy, link }) => {
  return (
    <Link href={`${link}`}>
      <a
        className={`${styles.card_operaciones} w-[100%] h-[337px] text-white bg-grayDHNN3 transition-all hover:text-black p-[30px] lg:p-[60px] flex flex-col justify-between`}
      >
        <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-20 lg:gap-0 relative z-10">
          <h3 className="text-[32px]  font-bold">{title}</h3>
          <svg
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15.5" cy="16" r="15.5" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.38612 15.3737L18.7021 15.3737L15.7586 12.4302C15.5118 12.1833 15.7886 12.0425 16.0461 11.785C16.3037 11.5274 16.4445 11.2506 16.6913 11.4974L20.7138 15.5199C20.9607 15.7668 20.952 16.1757 20.6944 16.4332L16.497 20.6306C16.2394 20.8882 16.0515 20.5583 15.8635 20.3703C15.6755 20.1823 15.3456 19.9943 15.6031 19.7367L18.6746 16.6653L9.35863 16.6653L9.38612 15.3737Z"
              fill="#282728"
            />
          </svg>
        </div>
        <p className="relative z-10">{copy}</p>
      </a>
    </Link>
  )
}

export default Card
