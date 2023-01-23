import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import { Header } from './index';

afterEach(cleanup);

describe('Header test', () => {
  test('Page info and form rendered to the page', () => {
    render(<Header />);
    const button = screen.getByText('Главная страница');
    const name = screen.getByText('UX AIR');
    expect(name).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
