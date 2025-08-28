import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { FaQuestionCircle, FaGift } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const data = [
  { option: "Voucher 10k", style: { backgroundColor: "#f87171", textColor: "white" } },
  { option: "Voucher 50k", style: { backgroundColor: "#60a5fa", textColor: "white" } },
  { option: "Thêm 100 điểm", style: { backgroundColor: "#34d399", textColor: "white" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "black" } },
];

export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [showRuleForm, setShowRuleForm] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Navbar */}
      <Navbar />

      {/* Container vòng quay */}
      <div className="relative inline-block">
        {/* Icon chấm hỏi */}
        <button
          onClick={() => setShowRuleForm(true)}
          className="absolute -top-9 -left-7 p-3 bg-white/40 backdrop-blur-md 
                     rounded-lg border border-white shadow hover:scale-110 transition"
        >
          <FaQuestionCircle className="text-green-500" size={26} />
        </button>

        {/* Icon quà */}
        <button
          onClick={() => setShowGiftForm(true)}
          className="absolute -top-9 -right-7 p-3 bg-white/40 backdrop-blur-md 
                     rounded-lg border border-white shadow hover:scale-110 transition"
        >
          <FaGift className="text-yellow-500" size={28} />
        </button>

        {/* Vòng quay */}
        <div className="relative flex items-center justify-center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => setMustSpin(false)}
            outerBorderColor={["#6366f1", "#ec4899", "#f97316"]}
            outerBorderWidth={15}
            radiusLineColor="white"
            radiusLineWidth={3}
            fontSize={14}
            textDistance={55}
            innerRadius={10}
            innerBorderWidth={2}
            innerBorderColor="#1e293b"
          />
        </div>
      </div>

      {/* Nút quay */}
      <button
        onClick={handleSpinClick}
        className="px-8 py-3  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                   text-white font-bold rounded-full shadow-lg hover:scale-105 transition"
      >
        Quay ngay
      </button>

      {/* Form đổi quà */}
      {showGiftForm && (
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
              onClick={() => setShowGiftForm(false)}
              className="mt-5 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Form thể lệ */}
      {showRuleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[420px] relative">
            <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">📜 Thể lệ trò chơi</h2>
            <ul className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Mỗi lượt chơi có cơ hội trúng 1 phần thưởng ngẫu nhiên.</li>
              <li>
                Phần thưởng: <b>Voucher 10k</b>, <b>Voucher 50k</b>, <b>Thêm 100 điểm</b>, hoặc{" "}
                <b>Không trúng</b>.
              </li>
              <li>Phần thưởng được cộng trực tiếp vào tài khoản sau khi quay.</li>
              <li>Chúc bạn may mắn! 🍀</li>
            </ul>
            <button
              onClick={() => setShowRuleForm(false)}
              className="mt-5 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
