declare module 'idmasker' {
    export function setPrivateKey(key: string): void;
    export function mask(numToMask: number): string;
    export function unmask(maskedStr: string): number;
}