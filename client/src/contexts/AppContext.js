import { createContext } from 'react';

// Nous fournissons ainsi à toute l'application l'URL de notre API (là ou sont stockées via le seed nos images)
export const ApiContext = createContext('https://restapi.fr/api/recipes');

// Owner du contrat
export const Owner = "0x3dc59996f6375B7D81df90f8BEa989e72c696b71";

// isOwner
export const IsOwner = false;