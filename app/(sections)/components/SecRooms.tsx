import Image from "next/image";

const product = [
  {
    img: "https://www.ikea.com/ext/ingkadam/m/70e3890c924dc2d9/original/PH205386.jpg?imwidth=300",
    title: "Bathroom",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/78e176bd7f60e31/original/PH205470.jpg?imwidth=300",
    title: "Bedroom",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/24ecb0718a2ad7e7/original/PH205530.jpg?imwidth=300",
    title: "Children's room",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/5657f3491b4d5c24/original/PH203946.jpg?imwidth=300",
    title: "Dining",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/1d21aa7d1f9d7b1d/original/PH205442.jpg?imwidth=300",
    title: "Hallway",
  },
];
function SecRooms({
  showSections,
  display,
}: {
  showSections: boolean | (() => void);
  display: boolean | (() => void);
}) {
  return (
    <section
      className={`content mb-[-35px] overflow-x-auto pb-5 transition-all duration-100 ease-out ${showSections ? "opacity-100" : "opacity-0"} ${display ? "block" : "hidden"}`}
      id="custom-scrollbars-content"
      style={{
        maxHeight: showSections ? "120px" : "0px",
      }}
    >
      <ul className="flex gap-5">
        {product.map((item, index) => (
          <li
            key={index}
            className="flex cursor-pointer flex-col items-center gap-3 text-black/50 hover:text-black/80 hover:underline"
          >
            <Image
              src={item.img}
              width={200}
              height={200}
              alt={item.title}
              className="h-22 w-40 object-cover"
            />
            <span className="block text-sm font-medium">{item.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SecRooms;
