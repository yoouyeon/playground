import { AuthProvider } from "./context/authContext";
import Router from "./router";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
