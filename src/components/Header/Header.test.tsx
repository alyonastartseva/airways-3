import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, test } from 'vitest';

import { Header } from './index';

const Component = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

afterEach(cleanup);

describe('Header test', () => {
  test('Page info and form rendered to the page', () => {
    render(<Component />);
    const button = screen.getByText('Главная страница');
    const name = screen.getByText('UX AIR');
    expect(name).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
