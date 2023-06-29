export default function XMark({ action }) {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer ml-2"
      onClick={action}
    >
      <path
        d="M5.64538 4.87233L9.59303 0.924683L10.7207 2.05235L6.77306 6.00001L10.7207 9.94766L9.59303 11.0753L5.64538 7.12768L1.69773 11.0753L0.570061 9.94766L4.51771 6.00001L0.570061 2.05235L1.69773 0.924683L5.64538 4.87233Z"
        fill="white"
      />
    </svg>
  )
}
