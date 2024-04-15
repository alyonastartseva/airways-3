import { Icon } from '@chakra-ui/react';

const ArmchairIcon = (props: { color?: string; size?: number }) => {
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
        d="M10.0001 18H22.0001C22.5524 18 23.0001 17.5523 23.0001 17C23.0001 16.4477 22.5524 16 22.0001 16H10.0001C9.44784 16 9.00013 16.4477 9.00013 17C9.00013 17.5523 9.44784 18 10.0001 18Z"
        fill={color}
      />
      <path
        d="M25.0001 9V12C25.0001 12.5523 25.4478 13 26.0001 13C26.5524 13 27.0001 12.5523 27.0001 12V9C27.0001 6.92894 25.5357 5.46447 25.5357 5.46447C24.0712 4 22.0001 4 22.0001 4L10.0001 4C7.92906 4 6.4646 5.46447 6.4646 5.46447C5.00013 6.92893 5.00013 9 5.00013 9V12C5.00013 12.5523 5.44784 13 6.00013 13C6.55241 13 7.00013 12.5523 7.00013 12V9C7.00013 7.75736 7.87881 6.87868 7.87881 6.87868C8.75749 6 10.0001 6 10.0001 6H22.0001C23.2428 6 24.1214 6.87868 24.1214 6.87868C25.0001 7.75736 25.0001 9 25.0001 9Z"
        fill={color}
      />
      <path
        d="M21.0002 16.0001V21.0001C21.0002 21.5523 21.4479 22.0001 22.0002 22.0001C22.5525 22.0001 23.0002 21.5523 23.0002 21.0001V16.0001C23.0002 15.09 23.5058 14.3333 23.5058 14.3333C24.0114 13.5767 24.8521 13.2284 24.8521 13.2284C25.6929 12.8802 26.5855 13.0577 26.5855 13.0577C27.478 13.2352 28.1215 13.8787 28.1215 13.8787C28.765 14.5222 28.9425 15.4148 28.9425 15.4148C29.1201 16.3073 28.7718 17.1481 28.7718 17.1481C28.4236 17.9889 27.6669 18.4945 27.6669 18.4945C26.9102 19.0001 26.0002 19.0001 26.0002 19.0001C25.4479 19.0001 25.0002 19.4478 25.0002 20.0001V25.0001H7.00019V20.0001C7.00019 19.4478 6.55247 19.0001 6.00019 19.0001C5.09014 19.0001 4.33347 18.4945 4.33347 18.4945C3.5768 17.9889 3.22855 17.1481 3.22855 17.1481C2.88029 16.3073 3.05783 15.4148 3.05783 15.4148C3.23537 14.5222 3.87886 13.8787 3.87886 13.8787C4.52236 13.2352 5.41491 13.0577 5.41491 13.0577C6.30747 12.8802 7.14824 13.2284 7.14824 13.2284C7.989 13.5767 8.49459 14.3333 8.49459 14.3333C9.00019 15.09 9.00019 16.0001 9.00019 16.0001V21.0001C9.00019 21.5523 9.4479 22.0001 10.0002 22.0001C10.5525 22.0001 11.0002 21.5523 11.0002 21.0001V16.0001C11.0002 14.4833 10.1575 13.2222 10.1575 13.2222C9.31488 11.9611 7.9136 11.3807 7.9136 11.3807C6.51232 10.8002 5.02473 11.0961 5.02473 11.0961C3.53714 11.392 2.46465 12.4645 2.46465 12.4645C1.39216 13.537 1.09626 15.0246 1.09626 15.0246C0.800359 16.5122 1.38079 17.9135 1.38079 17.9135C1.96122 19.3148 3.22233 20.1574 3.22233 20.1574C4.05548 20.7141 5.00019 20.903 5.00019 20.903V25.0001C5.00019 25.8285 5.58597 26.4143 5.58597 26.4143C6.17176 27.0001 7.00019 27.0001 7.00019 27.0001H25.0002C25.8286 27.0001 26.4144 26.4143 26.4144 26.4143C27.0002 25.8285 27.0002 25.0001 27.0002 25.0001V20.903C27.9449 20.7141 28.778 20.1574 28.778 20.1574C30.0392 19.3148 30.6196 17.9135 30.6196 17.9135C31.2 16.5122 30.9041 15.0246 30.9041 15.0246C30.6082 13.537 29.5357 12.4645 29.5357 12.4645C28.4632 11.392 26.9756 11.0961 26.9756 11.0961C25.488 10.8002 24.0868 11.3807 24.0868 11.3807C22.6855 11.9611 21.8428 13.2222 21.8428 13.2222C21.0002 14.4833 21.0002 16.0001 21.0002 16.0001Z"
        fill={color}
      />
    </Icon>
  );
};

export default ArmchairIcon;
