import { db } from "./src/prisma/db";
console.log(Object.keys(db.orm.public.User));
