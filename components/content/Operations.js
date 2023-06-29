export default function Operations({ copy }) {
  return (
    <div className="copy-back">
      <div dangerouslySetInnerHTML={{ __html: copy }}></div>
    </div>
  )
}
