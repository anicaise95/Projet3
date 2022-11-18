import { createContext } from 'react';

// Nous fournissons ainsi à toute l'application l'URL de notre API (là ou sont stockées via le seed nos images)
export const ApiContext = createContext('https://restapi.fr/api/recipes');

// Owner du contrat
export const Owner = "0x3Cb734Df6b203dDAf6e9C6Fe9ca744016b0c9BB5";

// isOwner
export const IsOwner = false;