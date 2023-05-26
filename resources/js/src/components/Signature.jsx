import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Signature() {
  const editorRef = React.useRef(null);

  return (
    <React.Fragment>
      <Editor
        apiKey="z0ofs10cgemuk3np8d585ugfc6gk6u6k6v32x2htj53u6pe4"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />
    </React.Fragment>
  );
}
