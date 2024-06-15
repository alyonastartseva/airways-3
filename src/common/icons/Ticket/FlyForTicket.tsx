import { Icon } from '@chakra-ui/react';

const FlyForTicket = (props: { color?: string; size?: number }) => {
  const { color = '#4797FF', size = 16 } = props;
  return (
    <Icon
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 16 16"
      fill="none"
      transform="rotate(90deg)"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 9l-2 2H0l1.875-3.002L0 5h1.5l2 2H7L3 1h2l6 6h4c.615 0 1 .404 1 1s-.385 1-1 1h-4l-6 6H3l4-6H3.5z"
        fill={color}
      ></path>
    </Icon>
  );
};

export default FlyForTicket;
