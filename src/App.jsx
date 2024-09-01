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

// Regularly loaded pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

// Other regularly loaded pages
import CarService from "./pages/CarService";
import Drivers from "./pages/Drivers";
import Rides from "./pages/Rides";
import Vehicles from "./pages/Vehicles";
import Logistic from "./pages/Logistic";
import Profit from "./pages/Profit";
import Documents from "./pages/Documents";
import PushNotification from "./pages/PushNotification";
import Rating from "./pages/Rating";
import Promos from "./pages/Promos";

// Regularly loaded features
import ServiceInformation from "./features/car-services/ServiceInformation";
import UserInformation from "./features/users/user/UserInformation";
import DriverInformation from "./features/drivers/driver/DriverInformation";
import DriverPendingInformation from "./features/drivers/driver/DriverPendingInformation";
import VehicleInformation from "./features/vehicles/vehicle/VehicleInformation";
import RideInformation from "./features/rides/ride/RideInformation";
import UserPendingInformation from "./features/users/user/UserPendingInformarion";

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
