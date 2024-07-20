declare module 'bcryptjs' {
    export function hashSync(s: string, salt: number): string;
    export function hash(s: string, salt: number): Promise<string>;
    export function compareSync(s: string, hash: string): boolean;
    export function compare(s: string, hash: string): Promise<boolean>;
    export function genSaltSync(salt?: number): string;
    export function genSalt(salt?: number): Promise<string>;
}
