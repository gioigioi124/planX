import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// gọi dotenv
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//  tạo ứng dụng bằng express
const app = express();

if (process.env.NODE_ENV === "development") {
  // thêm middleWare trong môi trường dev
  app.use(cors());
}
// Backend cần có dòng này (Express)
app.use(express.json()); // ← Để parse req.body từ JSON // Nếu không có dòng này, req.body sẽ là undefined!

app.use("/api/tasks", taskRoute); // tiền tố khai ở đầu, khai báo để sử dụng taskRoute API
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// connect DB
connectDB().then(() => {
  //  tạo lắng nghe trên cổng 5001
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});
