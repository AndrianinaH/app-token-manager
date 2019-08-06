export declare const appTokenManager: (jwtKey: string, jweKey: string) => {
    generate(payload: any): Promise<string>;
    decode(appToken: string): Promise<any>;
};
