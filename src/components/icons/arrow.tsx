import { SVGProps } from 'react';

export const Arrow = (props: SVGProps<SVGSVGElement>) => {
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
        d="m12 15.632l8.968-4.748l-.936-1.768L12 13.368L3.968 9.116l-.936 1.768z"
      ></path>
    </svg>
  );
};
