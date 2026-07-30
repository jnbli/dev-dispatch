import { Auth0Client } from "@auth0/nextjs-auth0/server";

// The Stripe Projects CLI prefixes env vars by resource name (resource
// "auth0-client" -> AUTH0_CLIENT_DOMAIN / AUTH0_CLIENT_CLIENT_ID / AUTH0_CLIENT_CLIENT_SECRET),
// not the plain AUTH0_DOMAIN/AUTH0_CLIENT_ID/AUTH0_CLIENT_SECRET the SDK defaults to.
export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_CLIENT_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_CLIENT_SECRET
});
