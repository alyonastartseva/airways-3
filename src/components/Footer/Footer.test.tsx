import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { Footer } from './index';
//Изменить ссылки на нужные, когда те будут доступны
describe('Footer test', () => {
  it('Footer renders correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>
    );
    const logo = screen.getByTestId('websiteLogo');
    const aboutUsBtn = screen.getByText('О нас');
    const privacyPolicyBtn = screen.getByText('Политика конфиденциальности');
    const contactUsBtn = screen.getByText('Связаться с нами');
    expect(logo).toBeInTheDocument();
    expect(aboutUsBtn).toBeInTheDocument();
    expect(privacyPolicyBtn).toBeInTheDocument();
    expect(contactUsBtn).toBeInTheDocument();
  });
  it('additional information buttons redirect correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>
    );

    const btns = [
      {
        link: screen.getByText('О нас'),
        path: '/',
      },
      {
        link: screen.getByText('Политика конфиденциальности'),
        path: '/',
      },
      {
        link: screen.getByText('Связаться с нами'),
        path: '/',
      },
    ];

    for (const btn of btns) {
      await userEvent.click(btn.link);
      const pathname = history.location.pathname;
      expect(pathname === btn.path).toBeTruthy();
    }
  });
});
