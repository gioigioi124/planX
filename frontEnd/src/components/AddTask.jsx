import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState(""); //tạo state lưu giá trị của newTaskTitle

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      //kiểm tra giá trị của newTaskTitle
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        //đây chính là req.body trong backend phần CreateTask, trả về một object {title:newTaskTitle}
        // status: "complete",
        // completedAt: new Date(), // phần backend chỉ cho phép người dùng gửi lên title cho nên những giá trị khác không được cập nhật
        toast.success(`Cây ${newTaskTitle} đã được thêm thành công!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm cây", error);
        toast.error("Lỗi xảy ra khi thêm cây");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Bạn cần nhập cây vào");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Trồng cây gì"
          className="h-11 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          onKeyPress={handleKeyPress}
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
