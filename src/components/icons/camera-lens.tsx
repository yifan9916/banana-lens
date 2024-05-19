import { SVGProps } from 'react';

export const CameraLens = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"></path>
        <path d="M17.197 9q-.15-.259-.323-.5m.937 5a6.01 6.01 0 0 1-4.311 4.311"></path>
      </g>
    </svg>
  );
};
