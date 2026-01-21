import * as admin from "firebase-admin";

async function sendNotif() {
  // Adjust value here
  /*
  * Firebase credentials
  */
    const config = {
    "projectId": "projectId",
    "privateKey": "privateKey",
    "clientEmail": "clientEmail"
  };
  // FCM Token, generated from firebase
  const fcmToken = 'fcmToken';
  // End adjust value
    const serviceAccount = {
        clientEmail: config.clientEmail,
        projectId: config.projectId,
        privateKey: config.privateKey.replace(/\\n/g, "\n")
      };
    admin.initializeApp(
        {
          credential: admin.credential.cert(serviceAccount),
        //   databaseURL: -- add database url if required
        },
        'debug'
      );
      const app = admin.app("debug");
      const messages = [{
        data: {
            customValue:"sample custom value",
        },
        notification: {
          title:"Sample Notif",
          body:"Sample Body",
        },

        token:fcmToken
      }];
      const result = await app.messaging().sendEach(messages);
      console.log(JSON.stringify(result))
}

sendNotif().then(()=>console.log('Success'))
