import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
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
import ViewCarBrand from "./features/customization/UserCar/Brand/ViewCarBrand";
import ServicesLayout from "./features/customization/Service/ServicesLayout";
import CarBrandLayout from "./features/customization/UserCar/Brand/CarBrandLayout";
import ViewServices from "./features/customization/Service/ViewServices";
import OrganizationLayout from "./features/customization/Organization/OrganizationLayout";
import { useTranslation } from "react-i18next";
import "../i18n"; // Import the i18n configuration
import { AuthProvider } from "./Context/AuthContext";
import SettingLayout from "./features/Setting/SettingLayout";
import ViewRole from "./features/Setting/Role/Role Informations/ViewRole";
import RoleLayout from "./features/Setting/Role/RoleLayout";
import AdminLayout from "./features/Setting/Admin/AdminsLayout";
import AddRoleScreen from "./features/Setting/Role/AddRoleScreen";
import ViewAdmin from "./features/Setting/Admin/Admin Informations/ViewAdmin";
import { useAuth } from "./Context/useAuth";
// Configure QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes: Keep data fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes: Retain cached data for 10 minutes
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnMount: false, // Do not refetch on component mount if data is cached
      refetchOnReconnect: false, // Do not refetch on network reconnect
      keepPreviousData: true, // Retain previous data while fetching
    },
  },
});

// Admin Routes Component
function AdminRoutes() {
  const { loading } = useAuth();
  if (loading) return <div>Loading app...</div>; // prevents early redirect
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Default route */}
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />

        {/* Admin routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/car-services" element={<CarService />} />
        <Route
          path="/car-services/car-service-information/:Id"
          element={<ServiceInformation />}
        />
        <Route path="/users" element={<Users />} />
        <Route
          path="/users/user-information/:Id"
          element={<UserInformation />}
        />
        <Route
          path="/users/user-pending-information/:Id"
          element={<UserPendingInformation />}
        />
        <Route path="/drivers" element={<Drivers />} />
        <Route
          path="/drivers/driver-information/:userId"
          element={<DriverInformation />}
        />
        <Route
          path="/drivers/driver-pending-information/:userId"
          element={<DriverPendingInformation />}
        />
        <Route path="/rides" element={<Rides />} />
        <Route
          path="/rides/ride-information/:Id"
          element={<RideInformation />}
        />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route
          path="/vehicles/vehicle-information/:Id"
          element={<VehicleInformation />}
        />
        <Route path="/logistic" element={<Logistic />} />
        <Route path="/profit" element={<Profit />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/push-notification" element={<PushNotification />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/promos" element={<Promos />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/customization/services" element={<ServicesLayout />} />
        <Route
          path="/customization/services/viewServices/:serviceId"
          element={<ViewServices />}
        />
        <Route
          path="/customization/organization"
          element={<OrganizationLayout />}
        />
        <Route path="/customization/userCar" element={<CarBrandLayout />} />
        <Route
          path="/customization/userCar/:CarBrand/:Id"
          element={<ViewCarBrand />}
        />

        <Route path="/setting" element={<SettingLayout />} />

        <Route path="/setting/admin" element={<AdminLayout />} />

        <Route
          path="/setting/admin/admin-information/:id"
          element={<ViewAdmin />}
        />

        <Route path="/setting/role" element={<RoleLayout />} />

        <Route
          path="/setting/role/role-information/:id"
          element={<ViewRole />}
        />

        <Route path="/setting/role/add-role" element={<AddRoleScreen />} />

        {/* <Route
          path="/setting/rolePermission"
          element={<RolePermissionLayout />}
        /> */}
      </Route>
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
        <AuthProvider>
          <Router>
            <Suspense fallback={<Spinner />}>
              <AdminRoutes />
            </Suspense>
          </Router>
        </AuthProvider>
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
