import { Icon } from '@chakra-ui/react';

const PaidIcon = (props: { color?: string; size?: number }) => {
  const { color = 'currentColor', size = 16 } = props;
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 16 16"
      fill={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 3.85a.763.763 0 00-.735.623.804.804 0 00-.015.156v3.935h-.6c-.338 0-.6.285-.6.622a.61.61 0 00.6.621h.6v.643h-.6c-.338 0-.6.285-.6.622a.61.61 0 00.6.621h.6v.479c0 .423.33.778.75.778s.75-.355.75-.778v-.479h1.8a.61.61 0 00.6-.621.611.611 0 00-.6-.622H7v-.643h1.95c1.578 0 2.85-1.342 2.85-2.978 0-1.636-1.272-2.979-2.85-2.979h-2.7zM7 8.25V5.407h1.95c.738 0 1.35.631 1.35 1.422 0 .79-.612 1.421-1.35 1.421H7z"
        fill={color}
      ></path>
    </Icon>
  );
};

export default PaidIcon;
