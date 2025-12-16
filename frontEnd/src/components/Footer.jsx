import React from "react";

const Footer = ({ completeTasksCount, activeTasksCount }) => {
  return (
    <>
      {completeTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completeTasksCount > 0 && (
              <>
                🎉Tuyệt vời! Bạn đã trồng được {completeTasksCount} cây,{" "}
                {activeTasksCount > 0 &&
                  ` còn ${activeTasksCount} cây nữa thôi, cố lên!`}
              </>
            )}
            {completeTasksCount === 0 && activeTasksCount > 0 && (
              <>Hãy bắt đầu trồng {activeTasksCount} cây nào!</>
            )}
          </p>
        </div>
      )}
      {completeTasksCount + activeTasksCount === 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Hãy chọn cây để bắt đầu trồng ngay hôm nay!
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
