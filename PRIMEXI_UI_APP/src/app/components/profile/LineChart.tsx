import type { CSSProperties } from 'react';

const buildPath = (data: number[], width: number, height: number) => {
  if (!data.length) {
    return '';
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1 || 1);

  return data
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
};

type LineChartProps = {
  data: number[];
  height?: number;
  accent?: string;
  background?: string;
  style?: CSSProperties;
};

export function LineChart({
  data,
  height = 120,
  accent = '#00ff85',
  background = 'rgba(0, 255, 133, 0.12)',
  style,
}: LineChartProps) {
  const width = 280;
  const path = buildPath(data, width, height);

  return (
    <div className="w-full overflow-hidden" style={style}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          stroke={accent}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d={`${path} L ${width} ${height} L 0 ${height} Z`}
          fill={background}
        />
      </svg>
    </div>
  );
}
