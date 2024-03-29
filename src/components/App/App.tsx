import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/layout';
import { LoginAdminForm } from '@components/LoginAdminForm';
import { AirplanesPage } from '@pages/Admin/Airplane';
import { UsersPage } from '@pages/Admin/Users';
import { DestinationsPage } from '@pages/Admin/DestinationsPage';
import { PageNotFound } from '@common/PageNotFound';
import { PassengersPage } from '@/pages/Passengers';
import { FlightsPage } from '@/pages/Admin/FlightsPage';
import { AirplaneMorePage } from '@/pages/Admin/AirplaneMorePage';
import { PrivateRoute } from '@/layout/PrivateRoute';
import { SignUpPage } from '@/pages/User/SignUpPage';
import { SearchTicketsPage } from '@/pages/User/SearchTicketsPage';
import { TicketsPage } from '@/pages/Admin/Tickets';
import { BookingPage } from '@/pages/Admin/BookingPage';
import { TimeZonesPage } from '@/pages/Admin/TimeZonesPage';
import { LoginForm } from '@components/LoginForm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchTicketsPage />} />
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
    // </QueryClientProvider>
  );
};

export default App;
