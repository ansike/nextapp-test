import { makeSerializable } from "@/app/lib/util";
import prisma from "../../../app/lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context?.params)
  const data = await prisma.video.findUnique({
    include: {
      chapter: true,
      author: true,
    },
    where: {
      id: Number(context?.params?.id),
    },
  });

  return {
    props: {
      data: makeSerializable(data),
    },
  };
};
