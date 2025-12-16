import mongoose from "mongoose";
// định nghĩa cấu trúc dữ liệu cho một Task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "complete"], // chỉ chấp nhận 2 trạng thái
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null, // khi status complete thì mới set giá trị
    },
  },
  {
    timestamps: true, //createdAt và updatedAt được tự động thêm vào
  }
);
//! sau khi có schema thì sẽ tạo model từ nó
//! mongo sẽ tự hiểu, model Task thì colection sẽ là tasks
const Task = mongoose.model("Task", taskSchema);
export default Task;
