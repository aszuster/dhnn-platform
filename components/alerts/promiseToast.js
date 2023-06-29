import toast from "react-hot-toast"

export default function promiseToast(action, loadingMsg, successMsg, errorMsg) {
  const toastMsg = toast.promise(
    new Promise((resolve, reject) => {
      try {
        action(resolve)
      } catch (error) {
        reject()
      }
    }),
    {
      loading: loadingMsg,
      success: successMsg,
      error: errorMsg,
    }
  )
  return toastMsg
}
