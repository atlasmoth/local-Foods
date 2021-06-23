import { Realm, app } from "./../libs/realm";

export default async function auhtenticate(obj = {}) {
  switch (obj.type) {
    case "email": {
      const credentials = Realm.Credentials.emailPassword(
        obj.email,
        obj.password
      );
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        assert(user.id === app.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    case "apple": {
      const redirectUri = "http://localhost:3000/";
      const credentials = Realm.Credentials.apple(redirectUri);
      try {
        const user = await app.logIn(credentials);
        Realm.handleAuthRedirect();
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    case "facebook": {
      const redirectUri = "http://localhost:3000/";
      const credentials = Realm.Credentials.facebook(redirectUri);

      try {
        const user = await app.logIn(credentials);
        Realm.handleAuthRedirect();
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    case "google": {
      const redirectUri = "http://localhost:3000/";
      const credentials = Realm.Credentials.google(redirectUri);

      try {
        const user = await app.logIn(credentials);

        Realm.handleAuthRedirect();
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
  }
}
