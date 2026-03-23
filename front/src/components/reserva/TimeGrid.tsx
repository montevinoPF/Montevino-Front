"use client";

interface TimeGridProps {
  selectedTime: string;
  onSelect: (time: string) => void;
  selectedDate?: Date | null; 
}

export default function TimeGrid({ selectedTime, onSelect }: TimeGridProps) {

  const times = [
    "08:30hs", "10:30hs", "12:30hs", "14:30hs",
    "16:30hs", "18:30hs", "20:30hs", "22:30hs"
  ];

  return (
    <div className="w-full mb-8">
      <label className="block text-lg font-medium text-slate-950 mb-4">
        ¿A qué hora?
      </label>

     
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {times.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => onSelect(time)}
            className={`relative p-4 rounded border-2 text-sm transition-all duration-200 
              ${selectedTime === time ? "border-black bg-gray-600 text-black font-bold" : "border-slate-400 text-slate-600 hover:border-slate-600"}`}
          >
            {time}
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
          </button>
        ))}
      </div>
    </div>
  )
}

