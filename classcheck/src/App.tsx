import { Suspense, lazy } from "react";
import LoadingScreen from "./components/public/LoadingScreen";

const Home = lazy(() => import("./AppRoutes"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Home />
    </Suspense>
  );
}

export default App;
