import { SVGProps } from 'react';

export const FlagNl = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <mask id="circleFlagsNl0">
        <circle cx="256" cy="256" r="256" fill="#fff"></circle>
      </mask>
      <g mask="url(#circleFlagsNl0)">
        <path
          fill="#eee"
          d="m0 167l253.8-19.3L512 167v178l-254.9 32.3L0 345z"
        ></path>
        <path fill="#a2001d" d="M0 0h512v167H0z"></path>
        <path fill="#0052b4" d="M0 345h512v167H0z"></path>
      </g>
    </svg>
  );
};
