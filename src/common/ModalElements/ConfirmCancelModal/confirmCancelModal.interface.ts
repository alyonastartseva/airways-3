export interface IConfirmCancelModal {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  modalText: string;
}
