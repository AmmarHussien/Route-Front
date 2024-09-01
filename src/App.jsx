import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  HashRouter as Router,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// Global Styles
import GlobalStyles from "./styles/GlobalStyles";

// Layout and Protected Route
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

// Lazily loaded pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Users = React.lazy(() => import("./pages/Users"));
const Login = React.lazy(() => import("./pages/Login"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

// Other lazily loaded pages
const CarService = React.lazy(() => import("./pages/CarService"));
const Drivers = React.lazy(() => import("./pages/Drivers"));
const Rides = React.lazy(() => import("./pages/Rides"));
const Vehicles = React.lazy(() => import("./pages/Vehicles"));
const Logistic = React.lazy(() => import("./pages/Logistic"));
const Profit = React.lazy(() => import("./pages/Profit"));
const Documents = React.lazy(() => import("./pages/Documents"));
const PushNotification = React.lazy(() => import("./pages/PushNotification"));
const Rating = React.lazy(() => import("./pages/Rating"));
const Promos = React.lazy(() => import("./pages/Promos"));

// Lazily loaded features
const ServiceInformation = React.lazy(() =>
  import("./features/car-services/ServiceInformation")
);
const UserInformation = React.lazy(() =>
  import("./features/users/user/UserInformation")
);
const DriverInformation = React.lazy(() =>
  import("./features/drivers/driver/DriverInformation")
);
const DriverPendingInformation = React.lazy(() =>
  import("./features/drivers/driver/DriverPendingInformation")
);
const VehicleInformation = React.lazy(() =>
  import("./features/vehicles/vehicle/VehicleInformation")
);
const RideInformation = React.lazy(() =>
  import("./features/rides/ride/RideInformation")
);
const UserPendingInformation = React.lazy(() =>
  import("./features/users/user/UserPendingInformarion")
);

// Configure QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// Admin Routes Component
function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate replace to="/adminpanel/dashboard" />}
        />
        <Route
          path="/adminpanel"
          element={<Navigate replace to="/adminpanel/dashboard" />}
        />
        <Route path="/adminpanel/dashboard" element={<Dashboard />} />
        <Route path="/adminpanel/car-services" element={<CarService />} />
        <Route
          path="/adminpanel/car-service-information/:Id"
          element={<ServiceInformation />}
        />
        <Route path="/adminpanel/users" element={<Users />} />
        <Route
          path="/adminpanel/user-information/:Id"
          element={<UserInformation />}
        />
        <Route
          path="/adminpanel/user-pending-information/:Id"
          element={<UserPendingInformation />}
        />
        <Route path="/adminpanel/drivers" element={<Drivers />} />
        <Route
          path="/adminpanel/driver-information/:userId"
          element={<DriverInformation />}
        />
        <Route
          path="/adminpanel/driver-pending-information/:userId"
          element={<DriverPendingInformation />}
        />
        <Route path="/adminpanel/rides" element={<Rides />} />
        <Route
          path="/adminpanel/ride-information/:Id"
          element={<RideInformation />}
        />
        <Route path="/adminpanel/vehicles" element={<Vehicles />} />
        <Route
          path="/adminpanel/vehicle-information/:Id"
          element={<VehicleInformation />}
        />
        <Route path="/adminpanel/logistic" element={<Logistic />} />
        <Route path="/adminpanel/profit" element={<Profit />} />
        <Route path="/adminpanel/documents" element={<Documents />} />
        <Route
          path="/adminpanel/push-notification"
          element={<PushNotification />}
        />
        <Route path="/adminpanel/rating" element={<Rating />} />
        <Route path="/adminpanel/promos" element={<Promos />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

// Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminRoutes />
        </Suspense>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-gray-0)",
            color: "var(--color-gray-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
