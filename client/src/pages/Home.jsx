import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { FaQuestionCircle, FaGift } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import GiftForm from "../Components/GiftForm";
import RuleForm from "../Components/RuleForm";

const data = [
  { option: "Voucher 10k", style: { backgroundColor: "#f87171", textColor: "white" } },
  { option: "Voucher 50k", style: { backgroundColor: "#60a5fa", textColor: "white" } },
  { option: "Thêm 100 điểm", style: { backgroundColor: "#34d399", textColor: "white" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "black" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "black" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "black" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "black" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "black" } },
];

export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [currentPrize, setCurrentPrize] = useState("");

  const maxSpinsPerDay = 3; // Giới hạn lượt quay mỗi ngày
  const [spinsLeft, setSpinsLeft] = useState(maxSpinsPerDay);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const savedData = JSON.parse(localStorage.getItem("spinData"));

    if (savedData && savedData.date === today) {
      setSpinsLeft(savedData.spinsLeft);
    } else {
      localStorage.setItem(
        "spinData",
        JSON.stringify({ date: today, spinsLeft: maxSpinsPerDay })
      );
      setSpinsLeft(maxSpinsPerDay);
    }
  }, []);

  const handleSpinClick = () => {
    if (spinsLeft <= 0) {
      alert("Bạn đã hết lượt quay hôm nay. Hãy quay lại vào ngày mai!");
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    const today = new Date().toLocaleDateString();
    const newSpinsLeft = spinsLeft - 1;
    setSpinsLeft(newSpinsLeft);
    localStorage.setItem(
      "spinData",
      JSON.stringify({ date: today, spinsLeft: newSpinsLeft })
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Navbar />

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
            onStopSpinning={() => {
              setMustSpin(false);
              setCurrentPrize(data[prizeNumber].option);
              setShowPrizePopup(true);
            }}
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
        disabled={spinsLeft <= 0}
        className={`px-8 py-3 font-bold rounded-full shadow-lg transition 
        ${spinsLeft > 0 
          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105" 
          : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
      >
        {spinsLeft > 0 ? `Quay ngay (${spinsLeft} lượt còn lại)` : "Hết lượt quay"}
      </button>

      {/* Popup thông báo trúng thưởng */}
      {showPrizePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Chúc mừng!</h2>
            <p className="text-lg text-gray-700">
              Bạn nhận được: <b>{currentPrize}</b>
            </p>
            <button
              onClick={() => setShowPrizePopup(false)}
              className="mt-5 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Gọi form đổi quà */}
      {showGiftForm && <GiftForm data={data} onClose={() => setShowGiftForm(false)} />}

      {/* Gọi form thể lệ */}
      {showRuleForm && <RuleForm maxSpinsPerDay={maxSpinsPerDay} onClose={() => setShowRuleForm(false)} />}
    </div>
  );
}
