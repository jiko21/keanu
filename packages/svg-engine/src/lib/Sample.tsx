import type { FC } from "react";

export const Sample: FC = () => {
  return (
    <div style={{width: '100px', height: '200px'}}>
      <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="30" width="80" height="120" rx="4" fill="transparent" stroke="black" stroke-width="2" />
        <g>
          <text x="10" y="59" fontSize="20">aaAaa</text>
          <line x1="10" y1="70" x2="90" y2="70" stroke="black" stroke-width="1" />
        </g>
        <g>
          <line x1="10" y1="110" x2="90" y2="110" stroke="black" stroke-width="1" />
          <text x="10" y="99"  fontSize="20">aaAaa</text>
        </g>
      </svg>
    </div>
  );
}
