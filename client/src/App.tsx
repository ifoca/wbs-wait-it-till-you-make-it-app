import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      {/* <GeneralState> TO DO: add general state management */}
      {/* <AuthState> TO DO: add auth state management */}
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> TO DO: add navbar component */}
        <Routes>
          <Route path="/" element={<div>Main Layout</div>}>
            <Route index element={<div>Home Page</div>} />
            <Route path="about" element={<div>About Page</div>}></Route>
          </Route>
          <Route path="user" element={<div>User Layout</div>}>
            <Route index element={<div>Login Page</div>} />
            <Route path="register" element={<div>Register Page</div>} />
            <Route path="profile" element={<div>Profile Page</div>} />
          </Route>
          <Route path="/:city/:station" element={<div>Results Page</div>} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
        {/* <Footer /> TO DO: add footer component */}
      </div>
      {/* </AuthState> */}
      {/* </GeneralState> */}
    </BrowserRouter>
  );
}

export default App;
