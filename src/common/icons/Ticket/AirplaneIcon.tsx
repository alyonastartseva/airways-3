import { Icon } from '@chakra-ui/react';

const AirplaneIcon = (props: { color?: string; size?: number }) => {
  const { color = 'white', size = 32 } = props;
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 32 33"
      fill="none"
    >
      <path
        d="M17.8182 18.8129V26.6954L20.8536 30.3315L20.8482 32.7592L16.0002 29.6937L11.1513 32.7592L11.1468 30.3315L14.1818 26.6954V18.8129L0.848755 24.2711V21.2409L14.1818 10.9361V1.84622C14.1821 0.842358 14.9957 0.0281448 16.0002 0.0281448C17.004 0.0281448 17.8182 0.842358 17.8182 1.84622V10.9361L31.1513 21.2409V24.2711L17.8182 18.8129Z"
        fill={color}
      />
    </Icon>
  );
};

export default AirplaneIcon;
