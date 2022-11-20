import { RadioButton } from 'primereact/radiobutton';

function Proposals(props) {

    function handleChangeSelectedProposal(value) {
        props.onChange(value);
    }

    console.log("Le voter a déjà voté pour : " + props.votedProposalId);
    console.log("Liste des propositions : " + props.setProposalsArray);

    return (
        <>
            {
                props.setProposalsArray.map((proposal, index) => {
                    return (
                        <>
                            {
                                index > 0 &&
                                <div key={index} className="field-radiobutton">
                                    <RadioButton inputId={index} checked={(props.votedProposalId == index) ? true : false} name="proposal" disabled={props.votedProposalId > 0 || props.newStatus != 3 ? true : false} value={index} onChange={(e) => handleChangeSelectedProposal(e.value)} />
                                    <label htmlFor={index}>{proposal.description}</label>
                                </div>
                            }
                        </>
                    )
                })
            }
        </>
    );
}
export default Proposals;