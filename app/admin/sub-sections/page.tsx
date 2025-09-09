import Form from "./components/Form";
import ListView from "./components/ListView";

function page() {
  return (
    <main className="flex flex-col gap-4 p-5 font-semibold">
      <Form />
      <ListView />
    </main>
  );
}

export default page;
