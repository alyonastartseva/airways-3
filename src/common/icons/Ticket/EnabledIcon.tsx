import { Icon } from '@chakra-ui/react';

const EnabledIcon = (props: { color?: string; size?: number }) => {
  const { color = '#97ba1e', size = 16 } = props;
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
        d="M8 16A8 8 0 108 0a8 8 0 000 16zm2.634-10.77L6.667 9.11 5.366 7.839a.813.813 0 00-1.132 0 .77.77 0 000 1.107l1.867 1.826a.813.813 0 001.131 0l4.534-4.435a.77.77 0 000-1.107.813.813 0 00-1.132 0z"
        fill={color}
      ></path>
    </Icon>
  );
};

export default EnabledIcon;
