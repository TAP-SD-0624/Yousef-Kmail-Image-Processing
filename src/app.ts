import express from "express";
import ImageRouter from "./routes/ImageRoutes";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { GobalErrorHandling } from "./Middlewares/GlobalErrorHandling";

const app = express();

app.use(
  fileUpload({
    // Configure file uploads with maximum file size 10MB
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

app.use(bodyParser.json());

app.use("/api/image", ImageRouter);

app.use(GobalErrorHandling);

const server = app.listen(3000, () => {
  console.log("listening on port 3000");
});

export { app, server };
