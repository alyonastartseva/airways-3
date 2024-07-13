import { Icon } from '@chakra-ui/react';

const MenuIcon = (props: { color?: string; size?: number }) => {
  const { color = '#4797ff', size = 16 } = props;
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 0A.75.75 0 018 .75V4c0 1.741-.834 3.38-2 3.996V15a1 1 0 11-2 0V7.996C2.835 7.381 2 5.742 2 4V.75a.75.75 0 01.648-.743L2.75 0a.75.75 0 01.75.75V4.5c0 .276.168.5.375.5.184 0 .337-.177.369-.41l.006-.09V.75a.75.75 0 111.5 0V4.5c0 .276.168.5.375.5.184 0 .337-.177.369-.41L6.5 4.5V.75A.75.75 0 017.25 0zm6.25 0a.5.5 0 01.5.5V15a1 1 0 11-2 0V9.661a1 1 0 00-.248-.658l-.505-.577A1 1 0 0111 7.767V4.65c0-.052.004-.105.012-.156.233-1.475.563-2.592.988-3.35.176-.303.355-.553.535-.751A1.2 1.2 0 0113.422 0h.078z"
        fill={color}
      ></path>
    </Icon>
  );
};

export default MenuIcon;
