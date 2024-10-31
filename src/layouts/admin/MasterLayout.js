import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import routes from '../../routes/routes';
import { Route, Routes , Navigate} from 'react-router-dom';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
        <main>
            <Routes>
              {/* Map through routes */}
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  element={route.element}  // Make sure you're using `element` for React Router v6
                />
              ))}

              {/* Redirect from /admin to /admin/dashboard */}
              <Route path="/admin" element={<Navigate to="/admin" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
