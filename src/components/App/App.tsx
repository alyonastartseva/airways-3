import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/layout';
import { PrivateRoute } from '@layout/PrivateRoute';
import { LoginAdminForm, LoginForm } from '@/components';
import {
  AirplanesPage,
  UsersPage,
  DestinationsPage,
  PassengersPage,
  FlightsPage,
  AirplaneMorePage,
  SignUpPage,
  SearchTicketsPage,
  FilteredTicketsPage,
  TicketsPage,
  BookingPage,
  TimeZonesPage,
  FlightSeatsPage,
  PageNotFound,
} from '@/pages';
import { ThemeProvider } from '@context/:ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchTicketsPage />} />
          <Route path="filter-tickets" element={<FilteredTicketsPage />} />
          <Route path="admin" element={<LoginAdminForm />} />
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="airplanes" element={<AirplanesPage />} />
            <Route
              path="airplanes/airplane-more"
              element={<AirplaneMorePage />}
            />
            <Route
              path="airplanes/airplane-more/:airplane"
              element={<AirplaneMorePage />}
            />
            <Route path="flight-seats" element={<FlightSeatsPage />} />
            <Route path="passengers" element={<PassengersPage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="hours" element={<TimeZonesPage />} />
          </Route>
          {/* вернуть внутрь после связики страницы с кнопоко подбронее */}
          <Route path="airplane-more" element={<AirplaneMorePage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      {/* // </QueryClientProvider> */}
    </ThemeProvider>
  );
};

export default App;
