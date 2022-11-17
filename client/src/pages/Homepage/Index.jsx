import useEth from "../../contexts/EthContext/useEth";
import Homepage from "./Homepage";
import NoticeNoArtifact from "./components/Artifact/NoticeNoArtifact";
import NoticeWrongNetwork from "./components/Artifact/NoticeWrongNetwork";

function HomepageProxyWallet() {
    const { state: { artifact, contract } } = useEth();

    return (
        <>
            {
                !artifact ? <NoticeNoArtifact /> :
                    !contract ? <NoticeWrongNetwork /> :
                        <Homepage />
            }
        </>
    );
}

export default HomepageProxyWallet;