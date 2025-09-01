import React, { useCallback, useMemo } from "react"
import ReactQuill from "react-quill-new"

import "react-quill-new/dist/quill.snow.css"

interface ReactQuillEditorProps {
  value: string
  onChange: (value: string) => void
  style?: React.CSSProperties
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({ value, onChange, style = {} }) => {
  // Quill 모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  )

  // Quill 포맷 설정
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "link",
    "image",
  ]

  return (
    <div style={style}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="공연 상세정보를 입력하세요"
        style={{ height: "200px" }}
      />
    </div>
  )
}

export default ReactQuillEditor
