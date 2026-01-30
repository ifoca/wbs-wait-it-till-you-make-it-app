import { BrowserRouter, Route, Routes } from 'react-router';
import { Footer, Navbar } from './components';
import { MainLayout, UserLayout } from './layouts';
import { Login, Register, UserProfile, DeleteAccount } from './pages';

function App() {
  return (
    <BrowserRouter>
      {/* <GeneralState> TO DO: add general state management */}
      {/* <AuthState> TO DO: add auth state management */}
      <div data-theme="aqua" className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Menu</div>} /> {/* TO DO: add Menu component */}
            <Route path="/:city/:station" element={<div>Results Page</div>} />
            <Route path="/favorites" element={<div>Favorites Page</div>} />
          </Route>
          <Route path="user" element={<UserLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="delete" element={<DeleteAccount />} />
          </Route>
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
