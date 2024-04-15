import { Icon } from '@chakra-ui/react';

const SuitcaseIcon = (props: { color?: string; size?: number }) => {
  const { color = '#1C1C1C', size = 32 } = props;
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 32 32"
      fill={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10C3 10 3 9.17157 3.58579 8.58579C3.58579 8.58579 4.17157 8 5 8H27C27 8 27.8284 8 28.4142 8.58579C28.4142 8.58579 29 9.17157 29 10V26C29 26 29 26.8284 28.4142 27.4142C28.4142 27.4142 27.8284 28 27 28H5C5 28 4.17157 28 3.58579 27.4142C3.58579 27.4142 3 26.8284 3 26V10ZM5 10V26H27V10H5Z"
        fill={color}
      />
      <path
        d="M10 7V27C10 27.5523 10.4477 28 11 28C11.5523 28 12 27.5523 12 27V7C12 6.58579 12.2929 6.29289 12.2929 6.29289C12.5858 6 13 6 13 6H19C19.4142 6 19.7071 6.29289 19.7071 6.29289C20 6.58579 20 7 20 7V27C20 27.5523 20.4477 28 21 28C21.5523 28 22 27.5523 22 27V7C22 5.75736 21.1213 4.87868 21.1213 4.87868C20.2426 4 19 4 19 4H13C11.7574 4 10.8787 4.87868 10.8787 4.87868C10 5.75736 10 7 10 7Z"
        fill={color}
      />
    </Icon>
  );
};

export default SuitcaseIcon;
