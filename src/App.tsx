import { Provider } from "react-redux";
import ContactsList from "./components/ContactsList";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <main className="w-full">
        <ContactsList />
      </main>
    </Provider>
  );
}

export default App;
