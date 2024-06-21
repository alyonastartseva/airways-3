import { Icon } from '@chakra-ui/react';

const SpinerIconTicket = (props: { color?: string; size?: number }) => {
  const { color = '#ff991f', size = 25 } = props;
  return (
    <Icon
      fill={color}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M4,12A8,8,0,0,1,18.93,8"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          data-name="primary"
          d="M20,12A8,8,0,0,1,5.07,16"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <polyline
          data-name="primary"
          points="14 8 19 8 19 3"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polyline>
        <polyline
          data-name="primary"
          points="10 16 5 16 5 21"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polyline>
      </g>
    </Icon>
  );
};

export default SpinerIconTicket;
