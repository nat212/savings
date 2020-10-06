import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

interface Profile {
  photoURL: string;
  anonymous: boolean;
  currencyCode: string;
}

export const createProfile = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({ photoURL: user.photoURL, anonymous: !!user.email, currencyCode: '' } as Profile);
});
