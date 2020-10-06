import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

interface TransferData {
  oldUid: string;
}

export const transferGoals = functions.https.onCall(async (data: TransferData, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'User not logged in');
  }
  if (!data.oldUid) {
    throw new functions.https.HttpsError('invalid-argument', 'Old UID must be provided');
  }
  const newUid = context.auth.uid;
  const newGoalsRef = admin.firestore().collection(`users/${newUid}/goals`);
  return admin
    .firestore()
    .collection(`users/${data.oldUid}}/goals`)
    .get()
    .then((goals) => {
      return admin.firestore().runTransaction(async (transaction) => {
        return transaction.get(newGoalsRef).then(() => {
          goals.docs.forEach((doc) => {
            const goalRef = newGoalsRef.doc(doc.id);
            transaction.set(goalRef, doc.data());
          });
        });
      });
    })
    .then(() => ({ success: true }))
    .catch((err) => {
      throw new functions.https.HttpsError('internal', `Error transferring goals: ${err}`);
    });
});
