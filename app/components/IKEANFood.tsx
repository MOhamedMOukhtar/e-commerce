import { Button } from "@/components/ui/button";
import Image from "next/image";

const items = [
  {
    img: "https://www.ikea.com/images/man-and-women-sat-in-an-ikea-restaurant-cb50c6f55d0aabb1c16facac3016c927.jpg?f=m",
    title: "IKEAN Restaurant",
  },
  {
    img: "https://www.ikea.com/images/a-table-with-ikea-ost-herrgard-cheese-platter-ikea-knaeckebr-fbb2fbf475e937e55df2898294ded649.jpg?f=m",
    title: "IKEAN Swedish food market",
  },
  {
    img: "https://www.ikea.com/images/three-children-getting-veggie-hot-dogs-at-ikea-bistro-counte-a394ede5dcf61fffc8ab48466c8a3bdc.jpg?f=m",
    title: "IKEAN Bistro",
  },
];

function IKEANFood() {
  return (
    <div className="-mt-20 mb-15 space-y-8">
      <div>
        <h2 className="text-2xl">IKEAN Food</h2>
      </div>
      <div className="flex gap-5 text-xs">
        {items.map((item, index) => (
          <div key={index}>
            <Image src={item.img} alt={item.title} width={1500} height={1500} />
            <Button
              variant={"default"}
              className="mt-10 rounded-full !text-xs font-bold"
            >
              {item.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IKEANFood;
