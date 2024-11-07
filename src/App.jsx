import { Suspense, useEffect } from "react";
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
import UserPendingInformation from "./features/users/user/UserPendingInformation";
import Spinner from "./ui/Spinner";
import Customization from "./pages/Customization";
import ViewCarBrand from "./features/customization/User Car//Brand/ViewCarBrand";
import ServicesLayout from "./features/customization/Service/ServicesLayout";
import CarBrandLayout from "./features/customization/User Car/Brand/CarBrandLayout";
import ViewServices from "./features/customization/Service/ViewServices";
import OrganizationLayout from "./features/customization/Organization/OrganizationLayout";
import { useTranslation } from "react-i18next";
import "../i18n"; // Import the i18n configuration

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
        {/* Default route */}
        <Route
          index
          element={<Navigate replace to="/adminPanel/dashboard" />}
        />
        <Route
          path="/adminPanel"
          element={<Navigate replace to="/adminPanel/dashboard" />}
        />

        {/* Admin routes */}
        <Route path="/adminPanel/dashboard" element={<Dashboard />} />
        <Route path="/adminPanel/car-services" element={<CarService />} />
        <Route
          path="/adminPanel/car-services/car-service-information/:Id"
          element={<ServiceInformation />}
        />
        <Route path="/adminPanel/users" element={<Users />} />
        <Route
          path="/adminPanel/users/user-information/:Id"
          element={<UserInformation />}
        />
        <Route
          path="/adminPanel/users/user-pending-information/:Id"
          element={<UserPendingInformation />}
        />
        <Route path="/adminPanel/drivers" element={<Drivers />} />
        <Route
          path="/adminPanel/drivers/driver-information/:userId"
          element={<DriverInformation />}
        />
        <Route
          path="/adminPanel/drivers/driver-pending-information/:userId"
          element={<DriverPendingInformation />}
        />
        <Route path="/adminPanel/rides" element={<Rides />} />
        <Route
          path="/adminPanel/rides/ride-information/:Id"
          element={<RideInformation />}
        />
        <Route path="/adminPanel/vehicles" element={<Vehicles />} />
        <Route
          path="/adminPanel/vehicles/vehicle-information/:Id"
          element={<VehicleInformation />}
        />
        <Route path="/adminPanel/logistic" element={<Logistic />} />
        <Route path="/adminPanel/profit" element={<Profit />} />
        <Route path="/adminPanel/documents" element={<Documents />} />
        <Route
          path="/adminPanel/push-notification"
          element={<PushNotification />}
        />
        <Route path="/adminPanel/rating" element={<Rating />} />
        <Route path="/adminPanel/promos" element={<Promos />} />
        <Route path="/adminPanel/customization" element={<Customization />} />
        <Route
          path="/adminPanel/customization/services"
          element={<ServicesLayout />}
        />
        <Route
          path="/adminPanel/customization/services/viewServices/:serviceId"
          element={<ViewServices />}
        />
        <Route
          path="/adminPanel/customization/organization"
          element={<OrganizationLayout />}
        />
        <Route
          path="/adminPanel/customization/userCar"
          element={<CarBrandLayout />}
        />
        <Route
          path="/adminPanel/customization/userCar/:CarBrand/:Id"
          element={<ViewCarBrand />}
        />
      </Route>

      {/* Login and catch-all route */}
      <Route path="/adminPanel/login" element={<Login />} />
      <Route path="/adminPanel/*" element={<PageNotFound />} />
    </Routes>
  );
}

// Main App Component
function App() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar-EG" ? "rtl" : "ltr";

  const isRTL = i18n.language === "ar-EG";

  useEffect(() => {
    document.body.dir = isRTL ? "rtl" : "ltr"; // Set direction on the body
    document.body.style.fontFamily = "Tajawal"; // Apply font-family
  }, [isRTL]);

  return (
    <div style={{ direction }}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Router>
          <Suspense fallback={<Spinner />}>
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
    </div>
  );
}

export default App;
