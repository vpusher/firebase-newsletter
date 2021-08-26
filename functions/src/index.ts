import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import { Response } from 'express';
import * as cors from 'cors';

// The Firebase Admin SDK to access Firestore.
admin.initializeApp();

const app = express();
const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
//app.use(myMiddleware);

type Subscriber = {
    id: string,
    email: string,
    created: Date,
    comfirmed: boolean
}
  
type AddSubscriberRequest = {
    body: { email: string },
    params: { subscriberId: string }
}

const addSub = async (req: AddSubscriberRequest, res: Response) => {
    const { email } = req.body;
    try {
        const subscribers = db.collection('subscribers').doc();

        const newSub: Subscriber = {
            id: subscribers.id,
            email,
            created: new Date(),
            comfirmed: false
        };
        
        subscribers.set(newSub);

        functions.logger.info("New sub!", newSub.email, { structuredData: true });
        
        res.status(200).send(newSub);
    } catch(error) {
        res.status(500).json(error.message);
    }
}

const getSubs = async (req: any, res: Response) => {
    try {
        const snapshot = await db.collection('subscribers').get();
        
        const subscribers: Subscriber[] = snapshot.docs.map((sub) => sub.data() as Subscriber);
        
        res.status(200).send(subscribers);
    } catch(error) {
        res.status(500).json(error.message);
    }
}


type SetAdminRequest = {
    body: { idToken: string }
}

const setAdmin = async (req: SetAdminRequest, res: Response) => {
    // Get the ID token passed.
    const idToken = req.body.idToken;

    try {
        // Verify the ID token and decode its payload.
        const claims = await admin.auth().verifyIdToken(idToken);
    
        // Verify user is eligible for additional privileges.
        if (typeof claims.email !== 'undefined' &&
        typeof claims.email_verified !== 'undefined' &&
        claims.email_verified &&
        claims.email.endsWith('@apeak.studio')) {
            // Add custom claims for additional privileges.
            await admin.auth().setCustomUserClaims(claims.sub, { role: "admin" });
    
            // Tell client to refresh token on user.
            res.end(JSON.stringify({
                status: 'success'
            }));

        } else {
            // Return nothing.
            res.end(JSON.stringify({ status: 'ineligible' }));
        }
    } catch(error) {
        res.status(500).json(error.message);
    }
};

app.get('/ping', (req, res) => res.status(200).send('pong'));
app.get('/subscribers', getSubs);
app.post('/subscribe', addSub);
app.post('/administrate', setAdmin);

exports.api = functions.https.onRequest(app);