# Projet VOTING

Cette DAPP est un système de vote de propositions sur la blockchain Ethereum. Le workflow est géré par l'administrateur.

## Fonctionnalités de la DAPP

- Enregistrement d’une liste blanche d'électeurs. 
- L'administrateur commence la session d'enregistrement de la proposition.
- Permettre aux électeurs inscrits d’enregistrer leurs propositions.
- L'administrateur met fin à la session d'enregistrement des propositions.
- L'administrateur commence la session de vote.
- Permettre aux électeurs inscrits de voter pour leurs propositions préférées.
- L'administrateur met fin à la session de vote.
- L'administrateur comptabilise les votes.
- Permettre à tout le monde de consulter le résultat.

## Installation

```sh
# Récupération des sources depuis Github
$ git clone https://github.com/anicaise95/Projet3.git
```

```sh
# Installation des dépendances Truffle
$ cd truffle
$ npm install
```

```sh
# Installation des dépendances du front 
$ cd client
$ npm install
```

```sh
# Installation des dépendances globales du projet 
$ cd ..
$ npm i
```


## Execution environnement local

```sh
# Dans un terminal, lancer la blockchain de développement Ganache (Installer Ganache au préalable si ce n'est pas fait)
$ ganache
```


Déployer le smart contract sur la blockchain de développement Ganache.
<ul>
 <li>Vérifier la présence du smartcontract dans le répertoire truffle/contracts/<b>voting.sol</b></li>
  <li>Vérifier la présence d'un fichier de migration dans truffle/migrations/1_xxxx.js</li>
</ul>

```sh
# Dans un autre terminal :
$ cd truffle
$ truffle migrate --reset
```

Démarrer le serveur front de dev : 

```sh
# Dans un autre terminal :
$ cd client
$ npm start
  Starting the development server ...
```

Lancer la DAPP via <a href='http/localhost:3000/'>http/localhost:3000/</a>

## Déploiement du smart contract sur le testnet Goerli

Le connecteur Infura Ethereum utilise l'API Infura JSON-RPC pour accéder à Ethereum.

```sh
# Créer le fichier /truffle/.env et renseigner :
INFURA_ID=XXXXXXXXXXXXX
MNEMONIC="XXXX XXXX XXXX XXXX XXXX XXX XXXXX XXXX"
```

INFURA_ID étant l'API KEY Infura
MNEMONIC étant la SEED du wallet (Metamask)

```sh
# Vérifier que le réseau Goerli est bien paramétré dans le fichier truffle/truffle-config.js
networks: {

    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(`${process.env.MNEMONIC}`, `https://goerli.infura.io/v3/${process.env.INFURA_ID}`)
      },
      network_id: 5,
    }
  }
```

```sh
# Dans un terminal :
$ cd truffle
$ truffle migrate --network goerli 
```

## Déploiement du front (REACT) sur VERCEL

La Dapp Voting a été déployée sur <a href='https://vercel.com/'>Vercel</a> et est accessible ici : <a href='https://projet3-henna.vercel.app/'>https://projet3-henna.vercel.app/</a>


## Présenttation de l'application en vidéo (LOOM)

Dans une petite video, je présente l'application : https://www.loom.com/share/9b84a6efde21420d99f64a93427c0125

