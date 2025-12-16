import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

// gọi dotenv
dotenv.config();

const PORT = process.env.PORT || 5001;
//  tạo ứng dụng bằng express
const app = express();

// thêm middleWare
app.use(cors());
// Backend cần có dòng này (Express)
app.use(express.json()); // ← Để parse req.body từ JSON // Nếu không có dòng này, req.body sẽ là undefined!

app.use("/api/tasks", taskRoute); // tiền tố khai ở đầu, khai báo để sử dụng taskRoute API

// connect DB
connectDB().then(() => {
  //  tạo lắng nghe trên cổng 5001
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});
