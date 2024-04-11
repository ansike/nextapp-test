import { makeSerializable } from "@/app/lib/util";
import { GetServerSideProps } from "next";
import { User, Video } from "@prisma/client";
import prisma from "../app/lib/prisma";
import VideoList from "@/app/components/video-list";
import LoginBtn from "@/app/components/login-btn";

type Props = {
  data: (Video & {
    author: User;
  })[];
};
export default function Home({ data }: Props) {
  console.log(data);
  return <div className="max-w-3xl mx-auto">
  <header className="flex justify-between items-center p-3 bg-white shadow">
    <h1 className="font-bold text-2xl">Next Video</h1>
    <LoginBtn />
  </header>
  <main className="px-3 mt-3">
    <VideoList className="grid grid-cols-2 gap-2" data={data} />
  </main>
</div>
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
