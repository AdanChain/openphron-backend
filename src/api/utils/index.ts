import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export const generateApiKey = (hint?: string): string => {
    const prefix = 'openphron_';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const keyLength = 30;
    
    const safeHint = hint ? hint.replace(/[^A-Za-z0-9]/g, '').slice(0, 10) : ''; 
    const remainingLength = keyLength - (prefix.length + safeHint.length);

    let randomPart = '';
    const randomValues = new Uint8Array(remainingLength);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < remainingLength; i++) {
        randomPart += characters[randomValues[i] % characters.length];
    }

    return prefix + safeHint + randomPart;
};
// // using uuid module
export const generateApiKeyWithUUID = (hint?: string): string => {
    const prefix = 'openphron_';
    const uuidPart = uuidv4().replace(/-/g, ''); // Remove hyphens from UUID
    const keyLength = 30;

    const safeHint = hint ? hint.replace(/[^A-Za-z0-9]/g, '').slice(0, 8) : ''; 
    const remainingLength = keyLength - (prefix.length + safeHint.length);

    return prefix + safeHint + uuidPart.slice(0, remainingLength);
};
// // using crypto-js module
export const generateApiKeyWithCryptoJs = (hint?: string): string => {
    const prefix = 'openphron_';
    const keyLength = 30;

    const safeHint = hint ? hint.replace(/[^A-Za-z0-9]/g, '').slice(0, 8) : ''; 
    const remainingLength = keyLength - (prefix.length + safeHint.length);

    const randomBytes = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64)
        .replace(/[^A-Za-z0-9]/g, ''); // Remove non-alphanumeric characters

    return prefix + safeHint + randomBytes.slice(0, remainingLength);
};
// // using web crypto api
export const generateWebCryptoApiKey = (hint?: string): string => {
    const prefix = 'openphron_';
    const keyLength = 30;

    const safeHint = hint ? hint.replace(/[^A-Za-z0-9]/g, '').slice(0, 8) : ''; 
    const remainingLength = keyLength - (prefix.length + safeHint.length);

    const array = new Uint32Array(remainingLength);
    crypto.getRandomValues(array);
    
    const randomString = Array.from(array).map(num => num.toString(36)).join('');

    return prefix + safeHint + randomString.slice(0, remainingLength);
};
