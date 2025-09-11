import React from "react";

export default function GiftForm({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <h2 className="text-4xl font-bold mb-4 text-black text-center">🎁 Đổi quà</h2>
        <div className="grid grid-cols-2 gap-4 text-red-400">
          {data.map((item, index) => (
            <div key={index} className="border p-3 rounded-lg text-center shadow">
              {item.option}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
