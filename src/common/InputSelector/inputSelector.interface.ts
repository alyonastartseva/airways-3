export interface IInputSelector {
  value: string;
  setValue(string: string): void;
  placeholder?: string;
}