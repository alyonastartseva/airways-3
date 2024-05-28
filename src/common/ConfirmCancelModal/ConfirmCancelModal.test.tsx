import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ConfirmCancelModal } from './index';

describe('ConfirmCancelModal тесты', () => {
  it('проверка на наличие текста в модальном окне', () => {
    const onClose = vi.fn();
    const onDelete = vi.fn();

    render(
      <ConfirmCancelModal
        isOpen={true}
        onClose={onClose}
        onDelete={onDelete}
        modalText="Любой текст"
      />
    );

    const modalBody = screen.getByRole('dialog');
    expect(modalBody.textContent).toBeTruthy();

    fireEvent.click(screen.getByText('Удалить'));
    expect(onDelete).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Отменить'));
    expect(onClose).toHaveBeenCalled();
  });
});
