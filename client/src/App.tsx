import { BrowserRouter, Route, Routes } from 'react-router';
import { Footer, Navbar } from './components';
import { MainLayout, UserLayout } from './layouts';
import { ErrorAndLoadingState, AuthState, FavoritesState } from './contexts/index';
import {
  Homepage,
  ErrorPage,
  Departures,
  Login,
  Register,
  UserProfile,
  DeleteAccount,
  FavoritesPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <div data-theme="aqua" className="flex flex-col min-h-screen">
        <ErrorAndLoadingState>
          <AuthState>
            <FavoritesState>
              <Navbar />
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Homepage />} />
                  <Route path="/search/:cityName/:stationName" element={<Departures />} />
                </Route>
                <Route path="user" element={<UserLayout />}>
                  <Route index element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="delete" element={<DeleteAccount />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <Footer />
            </FavoritesState>
          </AuthState>
        </ErrorAndLoadingState>
      </div>
    </BrowserRouter>
  );
}

export default App;
