import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false); // sửa giá trị cho task title
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || ""); //lưu giữ giá trị task title

  const handleKeyPress = (event) => {
    //enter để thay đổi task
    if (event.key === "Enter") {
      updateTask();
    }
  };

  //update task
  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success(`Cây đã được đổi thành ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error(`Lỗi xảy ra khi cập nhật cây ${task.title}`);
      toast.error("Lỗi xảy ra khi cập nhật cây");
    }
  };

  //delete task
  const deleteTask = async () => {
    try {
      //       const msg = prompt(`Xóa cây khỏi danh sách, bạn sẽ mất cây này vĩnh viễn
      // Điền "Yes" để xóa`);
      //       if (msg === "Yes") {
      //       } else {
      //         toast.info(`Bạn đã chọn giữ lại cây "${task.title}"`);
      //       }
      await api.delete(`/tasks/${task._id}`);
      toast.success(`Cây ${task.title} đã được xóa thành công`);
      handleTaskChanged();
    } catch (error) {
      console.error(`Lỗi xảy ra khi xóa cây ${task.title}`);
      toast.error("Lỗi xảy ra khi xóa cây");
    }
  };

  // nút hoàn thành, chưa hoàn thành
  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        handleTaskChanged();
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        handleTaskChanged();
      }
    } catch (error) {
      console.error("Lỗi xảy ra khi thao tác", error);
      toast.error("Lỗi xảy ra khi thao tác");
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200 ",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={() => toggleTaskCompleteButton()}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần phải làm gì"
              className="flex-1 text-base h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(event) => setUpdateTaskTitle(event.target.value)}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
              onKeyPress={handleKeyPress}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/* Ngày tạo và ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {/* Nếu complete thì hiện ngày hoàn thành */}
            {task.completedAt && (
              <>
                <span className="text-sm text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Nút chỉnh sửa và xóa */}
        <div className="hidden gap-2 group-hover:inline-block animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* nút xóa */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask()}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
