import type { ReactNode } from 'react';

type ToggleOption<T extends string> = {
  id: T;
  label: ReactNode;
};

type ToggleGroupProps<T extends string> = {
  options: ToggleOption<T>[];
  active: T;
  onChange: (value: T) => void;
};

export function ToggleGroup<T extends string>({
  options,
  active,
  onChange,
}: ToggleGroupProps<T>) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#140015]/80 p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
            active === option.id
              ? 'bg-[#00ff85] text-[#0b0b0b]'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
