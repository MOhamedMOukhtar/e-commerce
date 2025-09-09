import SectionSpecialOffers from "./components/SectionSpecialOffers";

export default function Home() {
  return (
    <main>
      <div className="mt-15 px-10">
        <h1 className="text-4xl font-bold">Welcome to IKEA Egypt</h1>
      </div>
      <div className="mt-25 px-10">
        <SectionSpecialOffers />
      </div>
    </main>
  );
}
