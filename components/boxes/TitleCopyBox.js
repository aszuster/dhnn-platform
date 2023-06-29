import React from "react"

const TitleCopyBox = ({title, copy}) => {
    return (
        <>
            <h2 className="mb-4">{title}</h2>
            <p className="mb-4">{copy}
            </p>
        </>
    )
}

export default TitleCopyBox
