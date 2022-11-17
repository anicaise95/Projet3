import { useRef, useEffect, useState } from "react";
import Proposals from "./Proposals";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import useEth from "../../../../contexts/EthContext/useEth";


// TIMELINE
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';

import './Timeline.scss';
// RAISED BUTTON
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { Owner } from '../../../../contexts/AppContext';
// INPUT 1 BUTTONS
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './../../../../../../client/src/asset/styles/primefaces/button.scss';


export default function TimelineComponent() {

    const activeColor = '#9C27B0';
    const inactiveColor = '#CCC';
    const { state: { contract, accounts } } = useEth();

    const [inputAddVoter, setInputAddVoter] = useState("");
    const [inputAddProposal, setInputAddProposal] = useState("");
    const [proposalsArray, setProposalsArray] = useState([]);
    const isOwner = (accounts[0] === Owner);
    const [voter, setVoter] = useState(undefined);
    const [winner, setWinner] = useState();
    const [previousStatus, setPreviousStatus] = useState(0);
    const [newStatus, setNewStatus] = useState(0);
    const [selectedProposal, setSelectedProposal] = useState(0);


    const getCurrentkWorkflowStatus = async () => {
        const currentWorkflow = await contract.methods.workflowStatus().call({ from: accounts[0] });
        console.log("currentWorkflow : " + currentWorkflow);
        setNewStatus(currentWorkflow);
        console.log("newStatus : " + newStatus);
    }

    // Traitement du workflow
    async function checkWorkflowStatus(method, isAfterCallMethod) {
        try {
            const workflowStatus = await contract.methods.workflowStatus().call({ from: accounts[0] });
            if (isAfterCallMethod) {
                toast.current.show({ severity: 'success', summary: 'Bravo !', detail: 'La modification a bien été prise en compte' });
            }
            console.log((isAfterCallMethod ? "Après " : "Avant ") + method + " : " + workflowStatus);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Une erreur est survenue lors de la mise à jour du workflow' });
        }
    }

    async function getVoter() {
        try {
            const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
            console.log("voter : " + voter);
            setVoter(voter);
        } catch (error) {
            toast.current.show({ severity: 'warn', summary: 'Privilèges insuffisants', detail: 'Vous n\'êtes pas enregistré sur la liste blanche' });
        }

    }

    /*********************************************************************** */
    /*               INTERACTION AVEC LA BLOCKCHAIN 
    /*********************************************************************** */

    // Lecture sur la blockchain
    const fetchProposalsArray = async () => {
        try {

            if (!isOwner) {
                // Impossible de récupérer un tableau complet en solidity, il faut passer par un index 
                // Nombre d'élements dans le tableau
                const proposalsArrayCount = await contract.methods.getProposalsArrayCount().call({ from: accounts[0] });

                // On reconstruit le tableau en allant récupérer une par une les proposition
                const proposalsArray = Array();

                for (let index = 0; index < proposalsArrayCount; index++) {
                    proposalsArray.push(await contract.methods.proposalsArray(index).call({ from: accounts[0] }));
                }

                setProposalsArray(proposalsArray);
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Une erreur est survenue lors de la récupération des propositions' });
        }
    };

    const getWinner = async () => {
        try {

            checkWorkflowStatus("winningProposalID", 0);
            const winningProposalID = await contract.methods.winningProposalID().call({ from: accounts[0] });
            console.log('winningProposalID :' + winningProposalID);

            winner = await contract.methods.getOneProposal(winningProposalID).call({ from: accounts[0] });
            setWinner(winner);
            //console.log('winningProposal : ' + winningProposal);
            //winner = winningProposal[0];

            console.log('winner : ' + winner);
            checkWorkflowStatus("winningProposalID", 1);
            return winner;
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Une erreur est survenue lors du dépouillement' });
        }
    }

    // Ecriture sur la blockchain

    async function addVoter(inputAddVoter) {
        console.log("Adresse du voter : " + inputAddProposal);
        try {
            await contract.methods.addVoter(inputAddVoter).send({ from: accounts[0] });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Erreur ! Le voter n\'a pas été prise en compte' });
        }
    }

    async function addProposal(inputAddProposal) {
        console.log("Proposal : " + inputAddProposal);
        try {
            await contract.methods.addProposal(inputAddProposal).send({ from: accounts[0] });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Erreur ! La proposition n\'a pas été prise en compte' });
        }
        getVoter();
    }

    async function setVote(selectedProposal) {
        console.log("Vous avez voté pour " + selectedProposal);
        try {
            await contract.methods.setVote(selectedProposal).send({ from: accounts[0] });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Erreur ! Votre vote n\'a pas été comptabilisé' });
        }
    }

    const startProposalsRegistering = async () => {
        checkWorkflowStatus("startProposalsRegistering", 0);
        await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        checkWorkflowStatus("startProposalsRegistering", 1);
    };

    const endProposalsRegistering = async () => {
        checkWorkflowStatus("endProposalsRegistering", 0);
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        checkWorkflowStatus("endProposalsRegistering", 1);
    };

    const startVotingSession = async () => {
        checkWorkflowStatus("startVotingSession", 0);
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        checkWorkflowStatus("startVotingSession", 1);
    };

    const endVotingSession = async () => {
        checkWorkflowStatus("endVotingSession", 0);
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        checkWorkflowStatus("endVotingSession", 1);
    };

    const tallyVotes = async () => {
        checkWorkflowStatus("tallyVotes", 0);
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        checkWorkflowStatus("tallyVotes", 1);
    };

    /*********************************************************************** */
    /*                  Gestion des evenements 
    /*********************************************************************** */

    contract.events.WorkflowStatusChange(() => { })
        .on('data', function (event) {
            setPreviousStatus(event.returnValues[0]);
            setNewStatus(event.returnValues[1]);
        })
        .on('error', function (error, receipt) {
            console.log('Error:', error, receipt);
        });

    contract.events.VoterRegistered(() => { })
        .on('data', function (event) {
            setInputAddVoter('');
            toast.current.show({ severity: 'success', summary: 'Bravo !', detail: 'Le voter ' + event.returnValues[0] + 'a bien été pris en compte' });
        })
        .on('error', function (error, receipt) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Erreur ! Le voter n\'a pas été enregistré' });
            console.log('Error:', error, receipt);
        });

    contract.events.ProposalRegistered(() => { })
        .on('data', function (event) {
            setInputAddProposal('');
            toast.current.show({ severity: 'success', summary: 'Bravo !', detail: 'Votre proposition a été prise en compte' });
        })
        .on('error', function (error, receipt) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Erreur ! Votre proposition n\'a pas été prise en compte' });
            console.log('Error:', error, receipt);
        });

    contract.events.Voted(() => { })
        .on('data', function (event) {
            toast.current.show({ severity: 'success', summary: 'Bravo !', detail: 'Votre vote a bien été prise en compte' });
        })
        .on('error', function (error, receipt) {
            toast.current.show({ severity: 'error', summary: 'Ouchhh ..', detail: 'Erreur ! Votre vote n\'a pas été pris en compte' });
            console.log('Error:', error, receipt);
        });

    useEffect(() => {
        getCurrentkWorkflowStatus();
        if (newStatus == 0) {
            setInputAddVoter('');
        }
        //customizedMarker();
    }, [newStatus]);

    useEffect(() => {
        (async function () {

            //getCurrentkWorkflowStatus();
            setVoter(undefined);

            if (!isOwner) {
                try {
                    // Check si l'utilisateur est enregistré sur la whitelist
                    console.log("Bienvenue voter : " + accounts[0]);
                    getVoter();
                } catch (error) {
                    toast.current.show({ severity: 'error', summary: 'Updated', detail: 'Vous n\'êtes pas enregistré par le owner' });
                    console.log(accounts[0] + " n'est pas enregistré");
                }
            } else {
                console.log("Bienvenue Owner : " + accounts[0]);
            }
            console.log("isOwner : " + isOwner);

            if (newStatus == 1 || newStatus == 2) {
                fetchProposalsArray();
            }

        })();

    }, [contract]);

    /*
    useEffect(() => {
        (async function () {
            getWinner();
        })();

    }, []);*/

    // ********************* Timeline *****************************

    // TODO : il va falloir gérer la color active/inactive si l'étape est passée ou non
    const events = [
        { status: 'Registring', date: '15/10/2020 10:30', icon: 'pi pi-cog', color: `${(newStatus == 0) ? activeColor : inactiveColor}` },
        { status: 'Proposals', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: `${(newStatus == 1) ? activeColor : inactiveColor}` },
        { status: 'Voting', date: '15/10/2020 16:15', icon: 'pi pi-cog', color: `${(newStatus == 2 || newStatus == 3) ? activeColor : inactiveColor}` },
        { status: 'Winner', date: '16/10/2020 10:00', icon: 'pi pi-check', color: `${(newStatus == 4) ? activeColor : inactiveColor}` }
    ];

    // Icone à chaque étape du workflow
    const customizedMarker = (item) => {
        return (
            <span className="custom-marker shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };
    // ********************* Timeline *****************************


    // ********************* Evenements JS *****************************

    const handleInputAddVoterChange = e => {
        //if (/^0x[a-fA-F0-9]{40}$/.test(e.target.value)) {
        setInputAddVoter(e.target.value);
        //}
    };
    const handleInputAddProposalChange = e => {
        setInputAddProposal(e.target.value);
    };

    const handleButtonAddVoterClick = async e => {
        if (inputAddVoter === "") {
            alert("Merci de renseigner l'adresse d'un électeur");
            return;
        }
        addVoter(inputAddVoter);
    };

    const handleButtonAddProposalClick = async e => {
        if (inputAddProposal === "") {
            alert("Merci de saisir une proposition");
            return;
        }
        addProposal(inputAddProposal);
    };

    const handleVoteClick = async e => {
        if (!isOwner) {
            setVote(selectedProposal);
        }
    };

    function handleChangeSelectedProposal(newValue) {
        setSelectedProposal(newValue);
    }


    // ******* Raised button
    const toast = useRef(null);

    const items1 = [
        {
            label: 'Ouvrir la session d\'enregistrement',
            icon: 'pi pi-refresh',
            command: () => {
                startProposalsRegistering();
            }
        },
        {
            label: 'Mettre fin à la session',
            icon: 'pi pi-times',
            command: () => {
                endProposalsRegistering();
            }
        }
    ];

    const items2 = [
        {
            label: 'Ouvrir la session des votes',
            icon: 'pi pi-refresh',
            command: () => {
                startVotingSession();
            }
        },
        {
            label: 'Mettre fin à la session des votes',
            icon: 'pi pi-times',
            command: () => {
                endVotingSession();
            }
        }
    ];

    const items3 = [
        {
            label: 'Comptabiliser les votes',
            icon: 'pi pi-refresh',
            command: () => {
                tallyVotes();
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Dépouillement des votes en cours' });
                toast.current.show({ severity: 'error', summary: 'Updated', detail: 'Une erreur est survenue lors du dépouillement des votes' });
            }
        }
    ];

    const save = () => {
        startProposalsRegistering();
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'La session d\'enregistrement est ouverte' });
    }

    // ******* Fin Raised button

    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                <Toast ref={toast} position="bottom-left"></Toast>
                {
                    item.status === 'Registring' && isOwner &&
                    <>
                        {
                            newStatus == 0 &&
                            <>
                                <div className="field">
                                    <label htmlFor="voterAdress" className="block">Ajouter un électeur sur la whitelist</label>
                                    <InputText id="voterAdress" value={inputAddVoter} onChange={handleInputAddVoterChange} aria-describedby="voterAdress-help" className="block" placeholder="0x..." />
                                    <small id="voterAdress-help" className="block">Entrer l'adresse du voter</small>
                                </div>
                                <Button label="Valider" onClick={handleButtonAddVoterClick} icon="pi pi-check" iconPos="right" />
                            </>
                        }
                        {
                            newStatus >= 1 &&
                            <span><b>La session est terminée</b></span>
                        }
                    </>
                }
                {
                    item.status === 'Registring' && voter !== undefined &&
                    <>
                        {
                            newStatus == 0 &&
                            <span><b>Vous êtes enregistré sur la liste des électeurs</b></span>
                        }
                        {
                            newStatus >= 1 &&
                            <span><b>La session est terminée</b></span>
                        }
                    </>
                }
                {
                    item.status === 'Proposals' && isOwner &&
                    <>
                        {
                            (newStatus == 0 || newStatus == 1) &&
                            <SplitButton label="Actions" disabled={(newStatus == 0 || newStatus == 1) ? false : true} model={items1} onClick={startProposalsRegistering} className="Success p-button-raised p-button-success p-button-text mr-2 mb-2"></SplitButton>
                        }
                        {
                            (newStatus == 1) &&
                            <div><b>La session est ouverte</b></div>
                        }
                        {
                            newStatus >= 2 &&
                            <span><b>La session est terminée</b></span>
                        }
                    </>
                }
                {
                    item.status === 'Proposals' && voter !== undefined &&
                    <>
                        {
                            newStatus >= 2 &&
                            <span><b>La session est terminée</b></span>
                        }
                        {
                            newStatus == 1 &&
                            <>
                                <div className="field">
                                    <label htmlFor="proposal" className="block">Proposition :</label>
                                    <InputText id="proposal" value={inputAddProposal} onChange={handleInputAddProposalChange} aria-describedby="proposal-help" className="block" />
                                    <small id="proposal-help" className="block">Entrer votre proposition de vote</small>
                                </div>
                                <Button label="Valider" onClick={handleButtonAddProposalClick} icon="pi pi-check" iconPos="right" />
                            </>
                        }
                    </>
                }
                {
                    item.status === 'Voting' && isOwner &&
                    <>
                        {
                            newStatus >= 4 &&
                            <span><b>La session est terminée</b></span>
                        }
                        {
                            (newStatus == 1 || newStatus == 2 || newStatus == 3) &&
                            <div className="field">
                                <SplitButton label="Actions" disabled={(newStatus == 1 || newStatus == 2) ? false : true} model={items2} onClick={save} className="Success p-button-raised p-button-success p-button-text mr-2 mb-2"></SplitButton>
                            </div>
                        }
                    </>
                }
                {
                    item.status === 'Voting' && voter !== undefined &&
                    <>
                        {
                            voter.hasVoted &&
                            <>
                                <span><b>Votre vote a bien été pris en compte</b></span>
                            </>
                        }
                        {
                            !voter.hasVoted &&
                            <>
                                <Proposals setProposalsArray={proposalsArray} onChange={handleChangeSelectedProposal} newStatus={newStatus} />
                                {
                                    newStatus == 3 &&
                                    <Button label="Voter" className="p-button-text" onClick={handleVoteClick}></Button>
                                }
                            </>
                        }
                    </>
                }
                {
                    item.status === 'Winner' && isOwner &&
                    <>
                        {
                            newStatus == 4 &&
                            <Button label="Dépouiller les votes" disabled={(newStatus == 4) ? false : true} className="p-button-text" onClick={tallyVotes}></Button>
                        }
                        {
                            newStatus >= 5 &&
                            <span><b>Le dépouillement est terminé</b></span>
                        }
                    </>
                }
                {
                    item.status === 'Winner' && voter !== undefined && newStatus >= 5 &&
                    <>
                        <Button label="Voir la gagnant" className="p-button-text" onClick={getWinner}></Button>
                        <span>La proposition gagnante est : <b>{winner}</b></span>
                    </>
                }
            </Card>
        );
    };

    return (
        <div className="timeline">
            <div className="card">
                <h3>Projet de vote de propositions</h3>
                <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
            </div>
        </div>
    );
}