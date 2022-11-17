import { createContext } from 'react';

// Nous fournissons ainsi à toute l'application l'URL de notre API (là ou sont stockées via le seed nos images)
export const ApiContext = createContext('https://restapi.fr/api/recipes');

// Owner du contrat
export const Owner = "0x77B69Aa3c52F2F97A0643D81C0921dF48E18c7F3";

// isOwner
export const IsOwner = false;