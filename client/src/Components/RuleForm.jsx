import React from "react";

export default function RuleForm({ onClose, maxSpinsPerDay }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[420px] relative">
        <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">📜 Thể lệ trò chơi</h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Mỗi lượt chơi có cơ hội trúng 1 phần thưởng ngẫu nhiên.</li>
          <li>
            Phần thưởng: <b>Voucher 10k</b>, <b>Voucher 50k</b>, <b>Thêm 100 điểm</b>, hoặc{" "}
            <b>Không trúng</b>.
          </li>
          <li>Mỗi tài khoản được quay {maxSpinsPerDay} lần/ngày.</li>
          <li>Phần thưởng được cộng trực tiếp vào tài khoản sau khi quay.</li>
          <li>Chúc bạn may mắn! 🍀</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
