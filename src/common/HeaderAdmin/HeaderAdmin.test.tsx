import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { EModalNames } from '@/constants/modal-constants/modal-names';

import HeaderAdmin from './HeaderAdmin';

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

describe('HeaderAdmin test', () => {
  it('HeaderAdmin render', () => {
    const heading = 'test';
    render(
      <HeaderAdmin heading={heading} formName={EModalNames.DESTINATIONS} />
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
