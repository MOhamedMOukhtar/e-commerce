import RichTextEditor from "./tiptab/Tiptab";

interface PropsDescription {
  data: string;
  handleData: (key: string, value: string | null) => void;
}

function Description({ data, handleData }: PropsDescription) {
  function handleChange(value: string | null) {
    handleData("description", value);
  }
  return (
    <section className="flex flex-1 flex-col gap-3 rounded-md border bg-white p-4">
      <h1 className="font-semibold">Description</h1>
      <RichTextEditor content={data} onChange={handleChange} />
    </section>
  );
}

export default Description;
