"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtEncrypt = require("jwt-token-encrypt");
const jwt = require("jsonwebtoken");
exports.appTokenManager = (jwtKey, jweKey) => {
    return {
        generate(payload) {
            return __awaiter(this, void 0, void 0, function* () {
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
                    secret: jwtKey,
                    expiresIn: '100y',
                };
                const appToken = yield jwtEncrypt.generateJWT(jwtDetails, publicData, encryption, privateData);
                return appToken;
            });
        },
        decode(appToken) {
            return __awaiter(this, void 0, void 0, function* () {
                // Verify App Token Signature
                try {
                    yield jwt.verify(appToken, jwtKey);
                }
                catch (err) {
                    throw err;
                }
                // Decrypt App Token
                // Encryption settings
                const encryption = {
                    key: jweKey,
                    algorithm: 'aes-256-cbc',
                };
                const decoded = yield jwtEncrypt.readJWT(appToken, encryption);
                return decoded.data;
            });
        },
    };
};
