import AppRouter from "../src/router/Router";
import Loading from "../src/components/Loading";
import Toast from "./components/Toast";

export default function App() {
  return (
    <>
      <Loading /> {/* 🔥 GLOBAL LOADER */}
      <AppRouter />
      <Toast />
    </>
  );
}