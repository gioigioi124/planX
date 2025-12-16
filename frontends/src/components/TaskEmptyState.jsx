import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có cây nào đang trồng"
              : filter === "complete"
              ? "Chưa trồng được cây nào"
              : "Chưa trồng cây nào"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Trồng cây đầu tiên"
              : `Chọn "tất cả" để thấy những cây ${
                  filter === "active" ? "đã trồng" : "đang trồng"
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
