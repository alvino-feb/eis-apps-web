import AppRouter from "../src/router/Router";
import Loading from "../src/components/Loading";

export default function App() {
  return (
    <>
      <Loading /> {/* 🔥 GLOBAL LOADER */}
      <AppRouter />
    </>
  );
}