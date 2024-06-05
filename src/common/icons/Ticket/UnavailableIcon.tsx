import { Icon } from '@chakra-ui/react';

const UnavailableIcon = (props: { color?: string; size?: number }) => {
  const { color = '#95a0b3', size = 16 } = props;
  return (
    <Icon
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16A8 8 0 108 0a8 8 0 000 16zm2.966-9.834L9.13 8l1.835 1.834a.8.8 0 11-1.132 1.132L8 9.13l-1.834 1.835a.798.798 0 01-1.132 0 .8.8 0 010-1.132L6.87 8 5.034 6.166a.8.8 0 111.132-1.132L8 6.87l1.834-1.835a.8.8 0 111.132 1.132z"
        fill={color}
      ></path>
    </Icon>
  );
};

export default UnavailableIcon;
