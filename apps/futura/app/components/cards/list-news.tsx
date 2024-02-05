import Link from "next/link";
import Card from "./card";
import moment from "moment";

const ListNews = (props: any) => {
  const { data } = props;
  return (
    <>
      {data &&
        data.FeaturedNews.map((item: any) => (
          <Card style="rounded-[20px] w-[400px]">
            <div className="relative">
              <img
                src={item?.Project?.coverImage?.url}
                alt={item?.Project?.title}
                className="w-full h-full object-cover rounded-t-[20px] rounded-[20px]"
              />
            </div>
            <div className="p-4 px-10">
              <Link
                href="#"
                className="text-[25px] font-medium mb-2 hover:text-[#E12827] hover:underline"
              >
                {item?.Project?.title}
              </Link>
              <p className="text-[12px] mb-4 font-bold text-[#E12827]">
                {item?.Project?.author?.lastName}{" "}
                {item?.Project?.author?.lastName} |{" "}
                {moment(item?.Project?.Date).format("MMMM DD, YYYY")}
              </p>
              <p className="text-[18px] text-[#100e0e] font-quicksand mb-9 font-normal lead-7">
                {item?.Project?.shortDescription}
              </p>
            </div>
          </Card>
        ))}
    </>
  );
};

export default ListNews;
