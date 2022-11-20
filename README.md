# Projet VOTING

Cette application est un système de vote de propositions. Le workflow est géré par l'administrateur.

## FOnctionnalités de la DAPP

Enregistrement d’une liste blanche d'électeurs. 
à l'administrateur de commencer la session d'enregistrement de la proposition.
aux électeurs inscrits d’enregistrer leurs propositions.
à l'administrateur de mettre fin à la session d'enregistrement des propositions.
à l'administrateur de commencer la session de vote.
aux électeurs inscrits de voter pour leurs propositions préférées.
à l'administrateur de mettre fin à la session de vote.
à l'administrateur de comptabiliser les votes.
à tout le monde de consulter le résultat.

## Installation


First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
  Starting the development server...
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.


## Déploiement du smart contract sur le testnet Goerli


```sh
# Install Truffle globally and run `truffle unbox`
$ cd truffle
$ truffle migrate --reset
```

## Déploiement du front (REACT) sur VERCEL

La Dapp est accessible ici 


## Présenttation de l'application en vidéo (LOOM)

https://www.loom.com/share/9b84a6efde21420d99f64a93427c0125


## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!
