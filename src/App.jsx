import AppRouter from "../src/router/Router";
import Loading from "../src/components/Loading";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";

export default function App() {
  return (
    <>
      <Loading /> 
      <AppRouter />
      <Toast />
      <ConfirmDialog />
    </>
  );
}