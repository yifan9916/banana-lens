import { SVGProps } from 'react';

export const FlagDe = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <mask id="circleFlagsDe0">
        <circle cx="256" cy="256" r="256" fill="#fff"></circle>
      </mask>
      <g mask="url(#circleFlagsDe0)">
        <path fill="#ffda44" d="m0 345l256.7-25.5L512 345v167H0z"></path>
        <path fill="#d80027" d="m0 167l255-23l257 23v178H0z"></path>
        <path fill="#333" d="M0 0h512v167H0z"></path>
      </g>
    </svg>
  );
};
