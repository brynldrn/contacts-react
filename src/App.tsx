import ContactsList from "./components/ContactsList";

function App() {
  return (
    <main className="w-full h-[100dvh] flex flex-col lg:flex lg:place-items-center lg:place-content-center px-8 overflow-hidden">
      <ContactsList />
    </main>
  );
}

export default App;
