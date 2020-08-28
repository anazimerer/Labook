import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/UserRouter";
import { AddressInfo } from "net";
import { friendshipRouter } from "./routes/FriendshipRouter";
import { postRouter } from "./routes/PostRouter";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/friendship", friendshipRouter);

app.use("/post", postRouter);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
