import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { EModalNames } from '@constants/modal-constants/modal-names';
import { HeaderTable } from '@common/HeaderTable';

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

describe('HeaderTable test', () => {
  it('HeaderTable render', () => {
    const heading = 'test';
    render(
      <HeaderTable heading={heading} formName={EModalNames.DESTINATIONS} />
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
