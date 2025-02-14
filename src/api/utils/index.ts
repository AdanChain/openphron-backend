import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const transformHint = (hint?: string): number => {
    if (!hint) return 0;
    return hint.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100;
};

export const generateApiKey = (hint?: string): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const keyLength = 30;

    const randomValues = new Uint8Array(keyLength);
    crypto.getRandomValues(randomValues);

    let randomPart = '';
    for (let i = 0; i < keyLength; i++) {
        randomPart += characters[(randomValues[i] + transformHint(hint)) % characters.length];
    }

    return randomPart;
};

// Using UUID module
export const generateApiKeyWithUUID = (hint?: string): string => {
    const uuidPart = uuidv4().replace(/-/g, ''); // Remove hyphens from UUID
    const keyLength = 30;

    const transformedHint = transformHint(hint);
    const modifiedUUID = uuidPart
        .split('')
        .map((char, i) => (i % 2 === 0 ? String.fromCharCode(char.charCodeAt(0) + transformedHint % 5) : char))
        .join('')
        .replace(/[^A-Za-z0-9]/g, '');

    return modifiedUUID.slice(0, keyLength);
};

// Using CryptoJS module
export const generateApiKeyWithCryptoJs = (hint?: string): string => {
    const keyLength = 30;

    const randomBytes = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64)
        .replace(/[^A-Za-z0-9]/g, '');

    const transformedHint = transformHint(hint);
    const modifiedRandom = randomBytes
        .split('')
        .map((char, i) => (i % 3 === 0 ? String.fromCharCode(char.charCodeAt(0) + transformedHint % 7) : char))
        .join('')
        .replace(/[^A-Za-z0-9]/g, '');

    return modifiedRandom.slice(0, keyLength);
};

// Using Web Crypto API
export const generateWebCryptoApiKey = (hint?: string): string => {
    const keyLength = 30;

    const array = new Uint32Array(keyLength);
    crypto.getRandomValues(array);

    const transformedHint = transformHint(hint);
    const randomString = Array.from(array)
        .map(num => String.fromCharCode((num % 26) + 65 + (transformedHint % 10)))
        .join('')
        .replace(/[^A-Za-z0-9]/g, '');

    return randomString.slice(0, keyLength);
};
