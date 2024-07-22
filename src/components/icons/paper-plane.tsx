import { SVGProps } from 'react';

export const PaperPlane = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 12L3.269 3.125A59.8 59.8 0 0 1 21.486 12a59.8 59.8 0 0 1-18.217 8.875zm0 0h7.5"
      ></path>
    </svg>
  );
};
