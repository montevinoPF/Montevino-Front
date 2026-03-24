"use client";

interface PersonSelectorProps {
  selected: number;
  onSelect: (num: number) => void;
}

export default function PersonSelector({
  selected,
  onSelect,
}: PersonSelectorProps) {
  {
    /*Se puede modificar la cantidad de personas */
  }
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full mb-8">
      {/* Etiqueta del campo */}
      <label className="block mb-4 text-lg font-medium text-center text-slate-900">
        Cantidad de personas
      </label>

      {/* Contenedor con Scroll Horizontal */}
      <div className="flex gap-4 pb-2 overflow-x-auto scrollbar-hide">
        {options.map((num) => (
          <button
            key={num}
            onClick={() => onSelect(num)}
            type="button"
            className={`flex-none w-14 h-14 rounded-full flex items-center justify-center text-lg transition-all duration-200 border-2 
              ${
                selected === num
                  ? "border-gray-950 text-blue-950 font-bold bg-slate-50/50"
                  : "border-slate-800 text-slate-800 hover:border-slate-300"
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
