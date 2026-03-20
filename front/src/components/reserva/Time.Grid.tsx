"use client";

interface TimeGridProps {
  selectedTime: string;
  onSelect: (time: string) => void;
  selectedDate?: Date | null;
}

export default function TimeGrid({ selectedTime, onSelect }: TimeGridProps) {
  const times = ["18:00", "20:00", "22:00", "00:00"];

  return (
    <div className="w-full mb-8">
      <label className="block mb-4 text-lg font-medium text-slate-950">
        ¿A qué hora?
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
  );
}
