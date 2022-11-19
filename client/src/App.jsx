import { EthProvider } from "./contexts/EthContext";
//import { useState } from "react";
import HomepageProxyWallet from "./pages/Homepage/Index";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
//import useEth from "./contexts/EthContext/useEth";

function App() {
  // const { state: { accounts } } = useEth();
  // const [account, setAccount] = useState();
  // setAccount(accounts[0]);

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