import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const TextEditor = ({ form, field }) => {
  const [text, setText] = useState(field.value)
  useEffect(() => {
    form.setFieldValue(field.name, text)
  }, [text])

  return (
    <>
      <ReactQuill
        theme="snow"
        value={text}
        onChange={setText}
        modules={modules}
      />
    </>
  )
}

export default TextEditor
