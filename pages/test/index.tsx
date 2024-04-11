import { makeSerializable } from "@/app/lib/util";
import { GetServerSideProps } from "next";
import { User, Video } from "@prisma/client";
import prisma from "../../app/lib/prisma";

type Props = {
  data: (Video & {
    author: User;
  })[];
};
export default function Home({ data }: Props) {
  console.log(data);
  return <div>test</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma?.video.findMany({
    include: { author: true },
  });
  return {
    props: {
      data: makeSerializable(data),
    },
  };
};
