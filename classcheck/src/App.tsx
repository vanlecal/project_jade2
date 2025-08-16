
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/public/LoadingScreen";
import Toaster from "@/components/ui/Toaster";

const Home = lazy(() => import("./AppRoutes"));


function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
