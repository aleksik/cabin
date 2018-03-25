import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import posts from './posts';
exports.posts = functions.https.onRequest(posts);