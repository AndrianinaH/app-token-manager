import * as jwtEncrypt from 'jwt-token-encrypt';
import * as jwt from 'jsonwebtoken';

export const appTokenManager = (jwtKey: string, jweKey: string) => {
  return {
    async generate(payload: any): Promise<string> {
      // Data that will be publicly available
      const publicData = {};

      // Data that will only be available to users who know encryption details.
      const privateData = payload;

      // Encryption settings
      const encryption = {
        key: jweKey,
        algorithm: 'aes-256-cbc',
      };

      // JWT Settings
      const jwtDetails = {
        secret: jwtKey, // to sign the token
        expiresIn: '100y',
      };

      const appToken = await jwtEncrypt.generateJWT(
        jwtDetails,
        publicData,
        encryption,
        privateData,
      );
      return appToken;
    },

    async decode(appToken: string) {
      // Verify App Token Signature
      try {
        await jwt.verify(appToken, jwtKey);
      } catch (err) {
        throw err;
      }
      // Decrypt App Token
      // Encryption settings
      const encryption = {
        key: jweKey,
        algorithm: 'aes-256-cbc',
      };
      const decoded = await jwtEncrypt.readJWT(appToken, encryption);
      return decoded.data;
    },
  };
};
