// encryptionUtils.js

import CryptoJS from 'crypto-js';

// Fonction de chiffrement des tokens
export function encryptToken(token) {
  // Logique de chiffrement ici (utilisez une méthode de chiffrement sécurisée)
  // Exemple : chiffrement avec une clé statique (pour simplifier l'exemple)
  const encryptedToken = CryptoJS.AES.encrypt(token, 'my-secret-key').toString();
  return encryptedToken;
}

// Fonction de déchiffrement des tokens
export function decryptToken(encryptedToken) {
  // Logique de déchiffrement ici (correspondant à la méthode de chiffrement utilisée)
  // Exemple : déchiffrement avec la même clé statique utilisée pour le chiffrement
  const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, 'my-secret-key').toString(CryptoJS.enc.Utf8);
  return decryptedToken;
}
