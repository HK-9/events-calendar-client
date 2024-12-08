import "./App.css";
import { CalendarProvider } from "./components/Calendar/CalendarContext";
import { AppRouter } from "./components/Router/Router";
import { AppProvider } from "./context/AppContex";
import { AlertProvider } from "./hooks/use-message-bar.hook";
import { AppLayout } from "./layouts/AppLayout";

function App() {
  return (
    <AppProvider>
      <AlertProvider>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </AlertProvider>
    </AppProvider>
  );
}

export default App;
