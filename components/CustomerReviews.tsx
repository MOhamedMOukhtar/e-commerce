import { Rating } from "@mui/material";
import Image from "next/image";

function CustomerReviews() {
  const list = [
    {
      name: "Penny albirtoon",
      message: "This is a review",
      rating: 4.5,
      imageLink:
        "https://static.wikia.nocookie.net/rockyandbullwinklefanon/images/7/7d/Penny_Peterson.png/revision/latest/scale-to-width-down/378?cb=20161226203619",
    },
    {
      name: "Osama Mohamed",
      message: "This is a review",
      rating: 5,
      imageLink:
        "https://pbs.twimg.com/profile_images/1666090981496864768/DKbRPL6K_400x400.jpg",
    },
    {
      name: "Emma Watson",
      message: "This is a review",
      rating: 3.5,
      imageLink:
        "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/A14lLCZYDhfYdBa0fFRpwMDiwRN.jpg",
    },
  ];
  return (
    <section className="flex justify-center">
      <div className="flex max-w-[900px] items-center justify-center gap-8">
        {list.map((item, index) => {
          return (
            <div key={index} className="h-64 w-50 border">
              <Image
                src={item.imageLink}
                width={100}
                height={100}
                alt={item.name}
                className="h-50 w-full bg-bottom object-cover object-top"
              />
              <h2>{item.name}</h2>
              <Rating
                size="small"
                name="customer-rating"
                defaultValue={item?.rating}
                precision={item?.rating}
                readOnly
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CustomerReviews;
