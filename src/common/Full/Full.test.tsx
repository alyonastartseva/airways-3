import { describe, it } from 'vitest';

import Full from '@common/Full/Full';
import { fireEvent, render, screen } from '@utils/test-utils';

describe('Full component tests', () => {
  it('Show and hide price detail with additional service', () => {
    render(<Full />);
    const detailButton = screen.getByRole('button', {
      name: /see price details/i,
    });
    fireEvent.click(detailButton);
    const wrapper = screen.queryByTestId('detail-wrapper');
    const heads = wrapper?.querySelectorAll('h3');
    const paragraphs = wrapper?.querySelectorAll('p');
    expect(wrapper).toBeInTheDocument();
    expect(heads).toHaveLength(4);
    expect(paragraphs).toHaveLength(8);

    fireEvent.click(detailButton);
    expect(wrapper).not.toBeInTheDocument();
  });

  it('Show and hide price detail without additional service', () => {
    render(<Full />);
    const detailButton = screen.getByRole('button', {
      name: /see price details/i,
    });

    fireEvent.click(detailButton);
    const wrapper = screen.queryByTestId('detail-wrapper');
    const heads = wrapper?.querySelectorAll('h3');
    const paragraphs = wrapper?.querySelectorAll('p');
    expect(wrapper).toBeInTheDocument();
    expect(heads).toHaveLength(3);
    expect(paragraphs).toHaveLength(4);

    fireEvent.click(detailButton);
    expect(wrapper).not.toBeInTheDocument();
  });
});
