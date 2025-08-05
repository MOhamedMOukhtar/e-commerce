"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface PropsDescription {
  data: { title: string; description: string };
  handleData: (key: string, value: string | null) => void;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bool", "italic", "underline", "strike", "blockquote"],
      [{ size: ["extra-small", "small", , "medium", "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [], background: [] }],
      ["clean"],
    ],
  },
};

function Description({ data, handleData }: PropsDescription) {
  function handleChange(value) {
    handleData("description", value);
  }
  return (
    <section className="flex flex-1 flex-col gap-3 rounded-md border bg-white p-4">
      <h1 className="font-semibold">Description</h1>
      <ReactQuill
        value={data.description}
        modules={modules}
        onChange={handleChange}
        placeholder="Enter description..."
      />
    </section>
  );
}

export default Description;
