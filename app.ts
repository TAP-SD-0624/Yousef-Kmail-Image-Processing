import express from "express";
import ImageRouter from "./src/routes/ImageRoutes";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(
  fileUpload({
    // Configure file uploads with maximum file size 10MB
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/image", ImageRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
