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
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const validateFirebaseIdToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.');
        res.status(403).send('Unauthorized');
        return;
    }
    try {
        const token = req.headers.authorization.split('Bearer ')[0];
        const decodedIdToken = yield admin.auth().verifyIdToken(token);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        return next();
    }
    catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    }
});
const app = express();
app.use(cors());
app.use(validateFirebaseIdToken);
app.post('/newPost', (request, response) => {
    response.send(`Hello ${request.user.name}`);
});
exports.default = app;
//# sourceMappingURL=posts.js.map