import { Icon } from '@chakra-ui/react';

const ArrowRight = (props: { color?: string }) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    viewBox="0 4 32 32"
    fill={props.color}
  >
    <path d="m20.586 16-9.293 9.293a1 1 0 0 0 1.414 1.414l10-10a1 1 0 0 0 0-1.414l-10-10a1 1 0 1 0-1.414 1.414L20.586 16Z" />
  </Icon>
);
export default ArrowRight;
