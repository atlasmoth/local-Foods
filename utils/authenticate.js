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
        console.log("We are hitting this chale");
        const user = await app.logIn(credentials);

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

// { "user_rating": { "$exists": true} }
