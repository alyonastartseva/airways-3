// import { Select } from 'antd';

// import { seatCategory } from '@/constants';
// import { ISeatCategoryType } from '@/interfaces/flightsSeats.interfaces';
// import { useTheme } from '@context/:ThemeProvider';
// import './SeatCategory.scss';

// interface SeatCategoryProps {
//   value?: ISeatCategoryType;
//   onChange?: (value: ISeatCategoryType) => void;
// }

// const SeatCategory: React.FC<SeatCategoryProps> = ({ value, onChange }) => {
//   const {theme} = useTheme();
//   (
//   <Select
//     value={value}
//     onChange={(v) => onChange?.(v as ISeatCategoryType)}
//     // className="seatCategory-select"
//     className={`seatCategory-select ${
//       theme === 'dark' ? 'dark-theme' : 'light-theme'
//     }`}
//     style={{ width: '100%' }}
//   >
//     {seatCategory.map((option) => (
//       <Select.Option key={option.eng} value={option.eng}>
//         {option.ru}
//       </Select.Option>
//     ))}
//   </Select>
// )};

// export default SeatCategory;

import { Select } from 'antd';

import { seatCategory } from '@/constants';
import { ISeatCategoryType } from '@/interfaces/flightsSeats.interfaces';
import { useTheme } from '@context/:ThemeProvider';
import './SeatCategory.scss';

interface SeatCategoryProps {
  value?: ISeatCategoryType;
  onChange?: (value: ISeatCategoryType) => void;
}

const SeatCategory: React.FC<SeatCategoryProps> = ({ value, onChange }) => {
  const { theme } = useTheme();

  return (
    <Select
      value={value}
      onChange={(v) => onChange?.(v as ISeatCategoryType)}
      className={`seatCategory-select ${
        theme === 'dark' ? 'dark-theme' : 'light-theme'
      }`}
      style={{ width: '100%' }}
    >
      {seatCategory.map((option) => (
        <Select.Option key={option.eng} value={option.eng}>
          {option.ru}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SeatCategory;
