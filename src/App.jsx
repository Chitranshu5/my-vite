
import "./App.css";
import Page_Routes from "./Componant/Page_Routes";
import { ChinuProvider } from "./Componant/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ChinuProvider>
      <Page_Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ChinuProvider>
  );
}

export default App;
