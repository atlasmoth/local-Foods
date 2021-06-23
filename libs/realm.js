import * as Realm from "realm-web";

export const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM });

export { Realm };
