import { RadioButton } from 'primereact/radiobutton';

function Proposals(props) {

    function handleChangeSelectedProposal(value) {
        // Here, we invoke the callback with the new value
        props.onChange(value);
    }

    console.log("Je rentre dans le component Proposals");
    console.log("votedProposalId : " + props.votedProposalId);
    console.log("props.newStatus : " + props.newStatus);
    console.log("props.setProposalsArray : " + props.setProposalsArray);

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