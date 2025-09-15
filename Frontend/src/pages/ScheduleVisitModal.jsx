import React, { useEffect,useState } from "react";
import dayjs from "dayjs";
import { X } from "lucide-react";


const ScheduleVisitModal = ({ pgName, pgId, gender, onClose }) => {
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const userData = localStorage.getItem("user");
  
  const timeSlots = [
    { label: "Morning", time: "10:00 AM - 12:00 PM" },
    { label: "Afternoon", time: "2:00 PM - 4:00 PM" },
    { label: "Evening", time: "5:00 PM - 7:00 PM" },
  ];

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().add(i, "day");
    return {
      label: date.format("ddd"),
      date: date.format("YYYY-MM-DD"),
      displayDate: date.format("D MMM"),
    };
  });

  useEffect(() => {
      const userData = localStorage.getItem("user");
     // console.log("User Data from localStorage:", userData);
      if (userData) {
        setUser(JSON.parse(userData)); // ✅ user object stored at login (must include _id, name, email, phone)
      }
    }, []);
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
  alert("User not loaded yet, please try again.");
  return;
}


  if (!selectedDate || !selectedSlot) {
    alert("Please select both date and slot.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/visits/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId:user?.id,
        propertyId: pgId,
        propertyName: pgName,
        date: selectedDate,
        slot: selectedSlot,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Visit scheduled successfully!");
      onClose();
    } else {
      alert(data.message || "Failed to schedule visit");
    }
  } catch (error) {
    //console.error("Error booking visit:", error);
    alert("Server error while scheduling visit");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
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
              onClick={() => {
                setSelectedDate(date);
                setSelectedSlot("");
              }}
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
            <h3 className="font-medium text-gray-800 mb-2">
              Select a Time Slot for {dayjs(selectedDate).format("DD MMM YYYY")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSlot === slot.time
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {slot.label} <span className="text-sm block">{slot.time}</span>
                </button>
              ))}
            </div>
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
