import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-b-transparent"></div>
    </div>
  );
};

export default Loading;
