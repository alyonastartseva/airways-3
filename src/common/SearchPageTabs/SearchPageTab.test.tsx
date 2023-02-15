import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import planeIcon from '@images/svg/plane-tab-icon.svg';

import SearchPageTabs from './SearchPageTabs';

describe('SearchPageTabs component', () => {
  it('renders tabs', () => {
    const tabs = [
      { label: 'flights', icon: planeIcon },
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
