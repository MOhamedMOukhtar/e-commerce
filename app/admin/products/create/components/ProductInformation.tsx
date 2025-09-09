import RichTextEditor from "./tiptab/Tiptab";

interface PropsProductInformation {
  data: string;
  handleData: (key: string, value: string | null) => void;
  name: string;
  title: string;
}

function ProductInformation({
  data,
  handleData,
  name,
  title,
}: PropsProductInformation) {
  function handleChange(value: string | null) {
    handleData(name, value);
  }
  return (
    <section className="flex flex-1 flex-col gap-3 rounded-md border bg-white p-4">
      <h1 className="font-semibold text-black/70">{title}</h1>
      <RichTextEditor content={data} onChange={handleChange} />
    </section>
  );
}

export default ProductInformation;
