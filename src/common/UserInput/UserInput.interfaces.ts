import { UseFormRegister, FieldValues } from 'react-hook-form';

interface IUserInputRegProps {
  name: string;
  regValue: string;
  typeField?: string;
  register: UseFormRegister<FieldValues>;
}

export type { IUserInputRegProps };
