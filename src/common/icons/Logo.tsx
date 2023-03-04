import { Icon } from '@chakra-ui/react';

const Logo = () => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width="88"
    height="62"
    fill="none"
    viewBox="0 0 88 62"
    ml="0.6rem"
  >
    <g filter="url(#filter0_b_25_704)">
      <g filter="url(#filter1_b_25_704)">
        <circle cx="31" cy="31" r="29" fill="#FEFEFE"></circle>
        <circle
          cx="31"
          cy="31"
          r="30"
          stroke="#04396D"
          strokeWidth="2"
        ></circle>
      </g>
      <path
        fill="#0A66C2"
        d="M3.934 17.467L18.24 32.934l13.147 12.373 26.68-27.84-29 37.12-25.133-37.12z"
      ></path>
      <path
        fill="#BD0909"
        d="M13.987 32.934l19.417 5.156 17.841 4.124 36.209-9.28-39.357 12.373-34.11-12.373z"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_b_25_704"
        width="101.454"
        height="76"
        x="-7"
        y="-7"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feGaussianBlur
          in="BackgroundImageFix"
          stdDeviation="3.5"
        ></feGaussianBlur>
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_25_704"
        ></feComposite>
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_25_704"
          result="shape"
        ></feBlend>
      </filter>
      <filter
        id="filter1_b_25_704"
        width="70"
        height="70"
        x="-4"
        y="-4"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feGaussianBlur
          in="BackgroundImageFix"
          stdDeviation="2"
        ></feGaussianBlur>
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_25_704"
        ></feComposite>
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_25_704"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </Icon>
);
export default Logo;
