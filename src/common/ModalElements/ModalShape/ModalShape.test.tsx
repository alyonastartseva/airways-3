import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { IAircraftPost } from '@/interfaces/aircraft.interfaces';
import { ITickets } from '@/interfaces/tickets.interface';
import {
  EModalButtonTexts,
  EModalNames,
} from '@/constants/modal-constants/modal-names';

import ModalShape from './ModalShape';

vi.mock('react-query', () => {
  const testData = [
    {
      model: 'testName',
      aircraftNumber: 1234,
      modelYear: 2001,
      flightRange: 1000,
    },
  ];
  return {
    useMutation: vi.fn().mockReturnValue({ data: testData, isSuccess: true }),
    useQueryClient: vi.fn().mockReturnValue({}),
  };
});

describe('ModalShape test', () => {
  it('Modal creating', () => {
    const formName = EModalNames.AIRPLANES;
    render(<ModalShape<IAircraftPost> formName={formName} />);

    expect(screen.getByText(EModalButtonTexts.AIRPLANES)).toBeInTheDocument();
  });

  it('ModalShape inputs is rendering', async () => {
    const formName = EModalNames.AIRPLANES;
    render(<ModalShape<IAircraftPost> formName={formName} />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getAllByLabelText('modal-input')).toHaveLength(4);
  });

  
});
