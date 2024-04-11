import { PrismaClient } from "@prisma/client";
// 为了防止，在开发模式下， PrismaClient 耗尽数据链接数，将实例化的 PrismaClient 对象存到全局 global 中， 详情可以看官网最佳实践。
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

// 在global对象上声明一个类型为PrismaClient或undefined的属性prisma
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
