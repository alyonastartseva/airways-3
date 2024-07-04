import { Select } from 'antd';

import { seatCategory } from '@/constants';
import { ISeatCategoryType } from '@/interfaces/flightsSeats.interfaces';

import './SeatCategory.scss';

interface SeatCategoryProps {
  value?: ISeatCategoryType;
  onChange?: (value: ISeatCategoryType) => void;
}

const SeatCategory: React.FC<SeatCategoryProps> = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(v) => onChange?.(v as ISeatCategoryType)}
    className="seatCategory-select"
  >
    {seatCategory.map((option) => (
      <Select.Option key={option.eng} value={option.eng}>
        {option.ru}
      </Select.Option>
    ))}
  </Select>
);

export default SeatCategory;
