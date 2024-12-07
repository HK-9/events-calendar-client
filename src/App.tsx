import "./App.css";
import { AppRouter } from "./components/Router/Router";
import { AlertProvider } from "./hooks/use-message-bar.hook";
import { AppLayout } from "./layouts/AppLayout";

function App() {
  return (
    <AppLayout>
      <AlertProvider>
        <AppRouter />
      </AlertProvider>
    </AppLayout>
  );
}

export default App;
