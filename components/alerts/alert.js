import React from "react"

const Alert = ({ color, showAlert, message, textColor }) => {
  return (
    <>
      {showAlert ? (
        <div
          className={
            "px-6 py-4 border-0 rounded relative mb-4 text-center bg-" +
            color +
            " text-" +
            textColor
          }
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">{message}</span>
        </div>
      ) : null}
    </>
  )
}

export default Alert
