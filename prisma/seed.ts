import { PrismaClient } from "@prisma/client";
import example from "./example.json";

// 初始化 Prisma Client
const prisma = new PrismaClient();
async function main() {
  //在此编写 Prisma Client 查询
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "小马",
  //       avatar:
  //         "https://p3-passport.byteimg.com/img/user-avatar/585e1491713363bc8f67d06c485e8260~100x100.awebp",
  //     },
  //   });
  //   console.log(user);

  const category = await prisma.category.create({
    data: {
      name: "数学",
    },
  });
  const chapters = example.data.outlines.reduce((res, item) => {
    item.lectures.forEach((lecture) => {
      res.push({
        title: lecture.title ?? lecture.en_title ?? "",
        cover: lecture.resource.cover_url,
        url: lecture.resource.content[0].url,
      });
    });

    return res;
  }, [] as any);

  console.log(chapters);

  await prisma.video.create({
    data: {
      title: example.data.title,
      pic: example.data.cover_url,
      desc: example.data.brief,
      categoryId: category.id,
      authorId: 1,
      chapter: {
        createMany: {
          data: chapters,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect();
  });
