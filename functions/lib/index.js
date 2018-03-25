"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const posts_1 = require("./posts");
exports.posts = functions.https.onRequest(posts_1.default);
//# sourceMappingURL=index.js.map