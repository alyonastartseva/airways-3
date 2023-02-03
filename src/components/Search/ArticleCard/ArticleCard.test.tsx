import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import ArticleCard from './ArticleCard';

describe('ArticleCard component', () => {
  const props = {
    title: 'Example Title',
    header: 'Example Header',
    body: 'Example Body',
    image: {
      src: 'https://example.com/image.jpg',
      alt: 'Example Image',
    },
  };

  it('should render the title, header, and body text', () => {
    const { getByText } = render(<ArticleCard {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.header)).toBeInTheDocument();
    expect(getByText(props.body)).toBeInTheDocument();
  });

  it('should render the image', () => {
    const { getByAltText } = render(<ArticleCard {...props} />);
    const image = getByAltText(props.image.alt);
    expect(image).toHaveAttribute('src', props.image.src);
  });
});
