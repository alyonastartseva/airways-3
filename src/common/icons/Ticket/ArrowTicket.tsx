import { Icon } from '@chakra-ui/react';

const ArrowTicket = (props: {
  color?: string;
  size?: number;
  rotate?: string;
}) => {
  const { color = '#4797FF', size = 16, rotate = 'rotate(0deg)' } = props;
  return (
    <Icon
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 16 16"
      fill="none"
      transform={rotate}
    >
      <path
        d="M11.5 6.25L8 9.75l-3.5-3.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </Icon>
  );
};

export default ArrowTicket;
