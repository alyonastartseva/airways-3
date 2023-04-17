import { render, screen } from '@testing-library/react';

import PassengersPage from './Passengers.page';

describe('PassengersPage component', () => {
  it('renders Passengers component', () => {
    render(<PassengersPage />);

    const passengersComponent = screen.getByTestId('passengers-component');

    expect(passengersComponent).toBeInTheDocument();
  });
});
