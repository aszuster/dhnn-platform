export default function Star({
  width = 120,
  height = 32,
  color = "currentColor",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M26.8,0v7.2l2.4,20.5c0,0,0,0,0,0l-13-16.1L11,6.5L8.9,8.7l0,0L6.5,11l5.1,5.1L27.8,29c0,0,0,0,0,0L7.2,26.8H0
	v3.1v0v3.3h7.2l20.4-2.3c0,0,0,0.1,0,0.1l-16,12.9L6.5,49l2.2,2.2l0,0l2.3,2.3l5.1-5.1l12.7-16c0,0,0.1,0,0.1,0.1l-2.2,20.4V60h3.1
	v0h3.3v-7.2l-2.3-20.3c0,0,0.1,0,0.1,0l12.9,16l5.1,5.1l2.2-2.2l0,0l2.3-2.3l-5.1-5.1L32.3,31.1c0,0,0-0.1,0-0.1l20.4,2.2H60v-3.1
	l0,0v-3.3h-7.2l-20.5,2.4c0,0,0,0,0,0l16.1-13l5.1-5.1l-2.2-2.2l0,0L49,6.5l-5.1,5.1L31,27.8c0,0,0,0,0,0l2.2-20.6V0h-3.1h0H26.8z"
      />
    </svg>
  )
}
