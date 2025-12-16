import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]); // chỗ để gom dữ liệu cần xử lý
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("week");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // hàm gọi API và lấy nhiệm vụ
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks); // gán giá trị cho taskBuffer
      setActiveTaskCount(res.data.activeCount); // gán giá trị cho activeTaskCount
      setCompleteTaskCount(res.data.completeCount); // gán giá trị cho completeTaskCount
      console.log(res.data);
    } catch (error) {
      console.log("lỗi xảy ra khi truy xuất tasks", error);
      toast.error("lỗi xảy ra khi truy xuất tasks");
    }
  };

  //filter Task theo điều kiện lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleNewTaskAdded = () => {
    fetchTasks();
    setFilter("active");
    setPage(1);
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //cắt task đã filter
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  //nếu ko có task nào thì trở về trang trước
  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full relative">
      {/* Soft Pastel Dream Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #F8BBD9 0%, #FDD5B4 25%, #FFF2CC 50%, #E1F5FE 75%, #BBDEFB 100%)`,
        }}
      />
      {/* Your Content/Components */}

      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleNewTaskAdded} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filterTasks={visibleTasks}
            handleTaskChanged={handleTaskChanged}
            filter={filter}
          />

          {/* Phân trang và lọc theo ngày */}
          <div className="flex flex-col align-top  justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Footer */}
          <Footer
            activeTasksCount={activeTaskCount}
            completeTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
