import styles from "./Homepage.module.scss";
import TimelineComponent from './components/Timeline/Timeline';
import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export default function Homepage() {

    const [contractOwner, setContractOwner] = useState("");
    const { state: { contract, accounts } } = useEth();

    const getOwner = async () => {
        // Adresse de l'owner du contrat
        const ownerAddress = await contract.methods.owner().call({ from: accounts[0] });
        setContractOwner(ownerAddress);
    }

    useEffect(() => {
        getOwner();
    }, [contractOwner]);

    return (
        <div className="flex-fill container d-flex flex-column p-20">
            <div className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}>
                <TimelineComponent contractOwner={contractOwner} />
            </div>
        </div>
    );
}