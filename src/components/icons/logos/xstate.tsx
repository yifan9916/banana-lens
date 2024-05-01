import { SVGProps } from 'react';

export const Xstate = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.891 0h6.023l-6.085 10.563A10.65 10.65 0 0 1 15.891 0m6.055 23.999L8.078.001H2.055l6.919 12.015L2.055 24h6.023L12 17.236L15.892 24z"
      ></path>
    </svg>
  );
};
