export default function SignOut({ action }) {
  return (
    <a onClick={action} href="">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3601 6.63965C19.6185 7.89844 20.4754 9.50209 20.8224 11.2478C21.1694 12.9936 20.991 14.803 20.3098 16.4474C19.6285 18.0918 18.4749 19.4972 16.995 20.486C15.515 21.4748 13.775 22.0026 11.9951 22.0026C10.2152 22.0026 8.47527 21.4748 6.9953 20.486C5.51532 19.4972 4.36176 18.0918 3.68049 16.4474C2.99921 14.803 2.82081 12.9936 3.16784 11.2478C3.51487 9.50209 4.37174 7.89844 5.63012 6.63965"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2V12"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
