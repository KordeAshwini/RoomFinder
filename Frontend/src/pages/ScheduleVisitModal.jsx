import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { X } from "lucide-react";

const ScheduleVisitModal = ({ pgName, gender, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const slotData = {
    "2025-08-01": ["10:00 AM", "11:30 AM", "2:00 PM"],
    "2025-08-02": ["9:00 AM", "1:00 PM", "4:00 PM"],
    "2025-08-03": ["10:30 AM", "3:00 PM", "6:00 PM"],
    "2025-08-04": ["11:00 AM", "2:30 PM", "5:30 PM"],
    "2025-08-05": ["10:00 AM", "12:00 PM", "4:00 PM"],
    "2025-08-06": ["9:30 AM", "1:30 PM", "3:30 PM"],
    "2025-08-07": ["10:30 AM", "2:00 PM", "6:00 PM"],
  };

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().add(i, "day");
    return {
      label: date.format("ddd"),
      date: date.format("YYYY-MM-DD"),
      displayDate: date.format("D MMM"),
    };
  });

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(slotData[selectedDate] || []);
      setSelectedSlot("");
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      alert("Please select both date and slot.");
      return;
    }
    alert(`Visit scheduled for ${pgName} on ${selectedDate} at ${selectedSlot}`);
    onClose(); // Close modal after confirming
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-orange-600 mb-2">Schedule a Visit</h2>
        <p className="text-gray-700 mb-1">PG: <strong>{pgName}</strong></p>
        <p className="text-gray-700 mb-4">Preferred for: <strong>{gender}</strong></p>

        {/* Days */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {next7Days.map(({ label, date, displayDate }) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`min-w-[80px] p-2 border rounded-lg text-center ${
                selectedDate === date
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
              }`}
            >
              <div className="font-semibold">{label}</div>
              <div className="text-sm">{displayDate}</div>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-800 mb-2">Available Slots on {dayjs(selectedDate).format("DD MMM YYYY")}</h3>
            {availableSlots.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSlot === slot
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-red-500">No slots available.</p>
            )}
          </div>
        )}

        {/* Submit */}
        {selectedSlot && (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Confirm Visit
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleVisitModal;


