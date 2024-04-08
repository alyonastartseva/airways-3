export interface IInputSelector {
  value?: string | number;
  index?: number;
  id?: string;
  editableRowIndex?: number | null;
  setValue?(value: string): void;
  placeholder?: string;
  updateData?(id: string, value: string): void;
  type?: string;
  label?: { value: string; name: string };
}
