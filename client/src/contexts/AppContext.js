import { createContext } from 'react';

// Nous fournissons ainsi à toute l'application l'URL de notre API (là ou sont stockées via le seed nos images)
export const ApiContext = createContext('https://restapi.fr/api/recipes');

// Owner du contrat
export const Owner = "0x7622B029cA85096C6D7244c9455e51E02c5352D0";

// isOwner
export const IsOwner = false;