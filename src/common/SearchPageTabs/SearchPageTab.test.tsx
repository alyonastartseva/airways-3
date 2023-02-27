import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { PlaneTabIcon } from '@common/icons';

import SearchPageTabs from './SearchPageTabs';

describe('SearchPageTabs component', () => {
  it('renders tabs', () => {
    const tabs = [
      { label: 'flights', icon: PlaneTabIcon },
      { label: 'check-in' },
      { label: 'manage booking' },
    ];

    render(<SearchPageTabs />);

    tabs.forEach((tab) => {
      const tabElement = screen.getByText(tab.label);
      expect(tabElement).toBeInTheDocument();

      if (tab.icon) {
        const tabIcon = screen.getByAltText(tab.label);
        expect(tabIcon).toBeInTheDocument();
      }
    });
  });
});
