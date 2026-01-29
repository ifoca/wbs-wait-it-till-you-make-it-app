import { BrowserRouter, Route, Routes } from 'react-router';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';

function App() {
  return (
    <BrowserRouter>
      {/* <GeneralState> TO DO: add general state management */}
      {/* <AuthState> TO DO: add auth state management */}
      <div data-theme="aqua" className="flex flex-col min-h-screen">
        {/* <Navbar /> TO DO: add navbar component */}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Menu</div>} /> {/* TO DO: add Menu component */}
            <Route path="about" element={<div>About Page?</div>}></Route>
          </Route>
          <Route path="user" element={<UserLayout />}>
            <Route index element={<div>Login Page</div>} />
            <Route path="register" element={<div>Register Page</div>} />
            <Route path="profile" element={<div>Profile Page</div>} />
          </Route>
          <Route path="/:city/:station" element={<div>Results Page</div>} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
        <Footer />
      </div>
      {/* </AuthState> */}
      {/* </GeneralState> */}
    </BrowserRouter>
  );
}

export default App;
