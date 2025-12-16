import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const { filter = "today" } = req.query; //lấy filter từ URL
    const now = new Date();
    let startDate;

    switch (filter) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        const mondayDate =
          now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "all":
      default: {
        startDate = null;
      }
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};
    // const tasks = await Task.find().sort({ createdAt: -1 }); // lấy toàn bộ dữ liệu
    // res.status(200).json(tasks); // trả dữ liệu ra dưới dạng Json
    const result = await Task.aggregate([
      { $match: query }, //lọc theo điều kiện sau đó mới bắt đầu lọc những điều kiện khác
      // trả về cho result một đối tượng là Object với các key là tasks là nhiệm vụ được sắp xếp
      // activeCount là một mảng [{"count":123}]
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completeCount });
    // trả về JSON cho result, để truyền lên frontend nếu frontend gọi res
  } catch (error) {
    console.log("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body; // Dùng Destructuring Assignment - TRÍCH XUẤT giá trị title từ req.body trong AddTask.jsx
    const task = new Task({ title }); // tạo models task truyền vào một đối tượng {title: "giá trị lấy từ req.body"}
    const newTask = await task.save(); // lưu task mới xuống database
    res.status(201).json(newTask); // nếu lưu thành công
  } catch (error) {
    console.log("Lỗi khi gọi createTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body; // lấy những trường có thể update, được gửi từ frontend
    const updatedTask = await Task.findByIdAndUpdate(
      // hàm này truyền vào 3 tham số
      req.params.id, // lấy id từ URL
      {
        title,
        status,
        completedAt,
      },
      { new: true } // trả về giá trị sau khi update
    );
    if (!updatedTask) {
      res.status(404).json({ message: "Nhiệm vụ không tồn tại" }); // nếu định update một task ko tồn tại
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Lỗi khi gọi updatedTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    console.log("Lỗi khi gọi deleteTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
