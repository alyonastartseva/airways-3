import { Icon } from '@chakra-ui/react';

const CompanyPoints = (props: { color?: string }) => {
  const { color = '#4797FF' } = props;
  return (
    <Icon w="13px" h="10px" viewBox="0 0 13 10" fill="none">
      <path
        d="M11.5 10V6.611H13V5h-1.5V0H9.473L6.56 7.332h-.12L3.527 0H1.5v5H0v1.611h1.5V10h1.61V2.966h.095l2.678 6.687h1.234l2.678-6.687h.094V10H11.5z"
        fill={color}
      ></path>
    </Icon>
  );
};

export default CompanyPoints;
