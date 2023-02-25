import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import ButtonGroupAdmin from './ButtonGroupAdmin';

describe('ButtonGroupAdmin test', () => {
  it('ButtonGroupAdmin renders', () => {
    const onPatch = vi.fn();
    const onCancel = vi.fn();
    render(
      <ButtonGroupAdmin patchDestination={onPatch} cancelEditing={onCancel} />
    );
    expect(screen.getByText('Отменить')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });

  it('ButtonGroupAdmin save click', () => {
    const onPatch = vi.fn();
    const onCancel = vi.fn();
    render(
      <ButtonGroupAdmin patchDestination={onPatch} cancelEditing={onCancel} />
    );
    const saveButton = screen.getByText('Сохранить');
    fireEvent.click(saveButton);
    expect(onPatch).toHaveBeenCalled();
  });

  it('ButtonGroupAdmin cancel click', () => {
    const onPatch = vi.fn();
    const onCancel = vi.fn();
    render(
      <ButtonGroupAdmin patchDestination={onPatch} cancelEditing={onCancel} />
    );
    const cancelButton = screen.getByText('Отменить');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });
});
