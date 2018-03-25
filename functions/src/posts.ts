import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

interface Request extends express.Request {
  user: admin.auth.DecodedIdToken;
}

const validateFirebaseIdToken = async (req: Request, res: express.Response, next: express.NextFunction) => {
  if (!req.headers.authorization || !(<String>req.headers.authorization).startsWith('Bearer ')) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.');
    res.status(403).send('Unauthorized');
    return;
  }
  try {
    const token = (<string>req.headers.authorization).split('Bearer ')[0];
    const decodedIdToken = await admin.auth().verifyIdToken(token);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    return next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }
}

const app = express();
app.use(cors());
app.use(validateFirebaseIdToken);

app.post('/newPost', (request: Request, response) => {
  response.send(`Hello ${request.user.name}`);
});

export default app;