import { EthProvider } from "./contexts/EthContext";
import HomepageProxyWallet from "./pages/Homepage/Index";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { seedRecipes } from "./data/seed";

seedRecipes();

function App() {
  return (
    <EthProvider>
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header />
        <HomepageProxyWallet />
        <Footer />
      </div>
    </EthProvider>
  );
}

export default App;