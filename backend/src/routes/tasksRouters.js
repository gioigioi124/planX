import express from "express";
const router = express.Router();
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasksControllers.js";
// tạo API, tham số đầu tiên là địa chỉ endpoint
// hoặc gọi là URL hay ROUTE
// get là lắng nghe một request dạng get để lấy dữ liệu
// chạy một hàm callBack có 2 tham số là request và response
router.get("/", getAllTasks);
router.post("", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
//! CRUD API (get, post, put, delete) (đọc, thêm, sửa, xóa)

export default router;
