import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        Plant a tree
      </h1>
      <p className="text-muted-foreground text-[14px]">
        Thời điểm tốt nhất để trồng cây <span className="text-xl">🌲</span>
      </p>
    </div>
  );
};

export default Header;
