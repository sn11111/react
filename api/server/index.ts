import "./env";
import express from "express";
import cors from "cors";
import todoRoutes from "../routes/TodoRoutes";
import userRoutes from "../routes/UserRoutes";
import createSession from "../session";
import bodyParser from "body-parser";

const port = process.env.PORT || 8001;

async function createServer() {
  try {
    await createSession();

    const app = express();

    const corsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.json());

    app.use(cors(corsOptions));
    app.use(todoRoutes);
    app.use(userRoutes);

    app.listen({ port }, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
