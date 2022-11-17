import { RadioButton } from 'primereact/radiobutton';

function Proposals(props) {

    function handleChangeSelectedProposal(value) {
        // Here, we invoke the callback with the new value
        props.onChange(value);
    }

    return (
        <>
            <h5>Veuillez sélectionner votre proposition :</h5>
            {
                props.setProposalsArray.map((proposal, index) => {
                    return (
                        <div key={index} className="field-radiobutton">
                            <RadioButton inputId={index} name="proposal" disabled={props.newStatus != 3 ? true : false} value={index} onChange={(e) => handleChangeSelectedProposal(e.value)} />
                            <label htmlFor={index}>{proposal.description}</label>
                        </div>
                    )
                })
            }
        </>
    );
}
export default Proposals;