import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import ELinks from '@/services/adminRouterLinks.service';

import { AdminHeader } from './index';

describe('AdminHeader', () => {
  it('AdminHeader renders correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );
    const exitBtn = screen.getByText('Выход');
    const passengersTab = screen.getByText('Пассажиры');
    const aircraftTab = screen.getByText('Самолёты');
    const destinationsTab = screen.getByText('Места назначения');
    const timeZonesTab = screen.getByText('Часовые пояса');
    const flightsTab = screen.getByText('Рейсы');
    expect(exitBtn).toBeInTheDocument();
    expect(passengersTab).toBeInTheDocument();
    expect(aircraftTab).toBeInTheDocument();
    expect(destinationsTab).toBeInTheDocument();
    expect(timeZonesTab).toBeInTheDocument();
    expect(flightsTab).toBeInTheDocument();
  });
  it('exit button returns to search page', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );

    await userEvent.click(screen.getByText(/Выход/i));
    const pathname = history.location.pathname;
    expect(pathname === '/' || pathname === '/search').toBeTruthy();
  });

  it('tabs redirect correctly', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );

    const tabs = [
      {
        link: screen.getByText('Пассажиры'),
        path: ELinks.ADMIN_PASSENGERS,
      },
      {
        link: screen.getByText('Самолёты'),
        path: ELinks.ADMIN_AIRPLANES,
      },
      {
        link: screen.getByText('Места назначения'),
        path: ELinks.ADMIN_DESTINATIONS,
      },
      {
        link: screen.getByText('Часовые пояса'),
        path: ELinks.ADMIN_HOURS,
      },
      {
        link: screen.getByText('Рейсы'),
        path: ELinks.ADMIN_FLIGHTS,
      },
    ];

    for (const tab of tabs) {
      await userEvent.click(tab.link);
      const pathname = history.location.pathname;
      expect(pathname === tab.path).toBeTruthy();
    }
  });
});
