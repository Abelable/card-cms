import styled from "@emotion/styled";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHttp } from "service/http";

export const RichTextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: any) => void;
}) => {
  const quillRef: any = useRef(null);
  const client = useHttp();

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
      ],
      handlers: {
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
          input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (file) {
              const formData = new FormData();
              formData.append("image", file);
              const res = await client("/api/v1/admin/upload/image", {
                method: "POST",
                formData,
              });
              const quillEditor = quillRef.current.getEditor();
              const range = quillEditor.getSelection();
              const index = range ? range.index : 0;
              quillEditor.insertEmbed(index, "image", res.url);
              quillEditor.setSelection(index + 1);
            }
          };
        },
      },
    },
  };

  return (
    <Editor
      ref={quillRef}
      theme="snow"
      modules={modules}
      value={content}
      onChange={setContent}
    />
  );
};

const Editor = styled(ReactQuill)`
  > .ql-container.ql-snow {
    min-height: 30rem;
  }
`;
