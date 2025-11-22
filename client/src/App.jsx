import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Services from "./pages/Services/Services";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Footer from "./components/Footer";
import Logout from "./pages/Logout";
import AdminLayout from "./components/Admin-Layout";
import AdminUsers from "./pages/Admin-page/Admin-Users";
import AdminContacts from "./pages/Admin-page/Admin-Contacts";
import AdminUserUpadate from "./pages/Admin-page/Admin-User-Upadate";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { useAuth } from "./store/auth";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {



useEffect(() => {
  AOS.init({
    duration: 800,     
    once: true,         
  });
}, []);

  
  const { isLoading } = useAuth();

  //show loader instead of all routes
  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        {/* Contact – user must be logged in */}
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUserUpadate />} />
        </Route>

        {/* Not found 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
