// import("dotenv").config({ silent: true });

import dotenv from "dotenv";
dotenv.config({ silent: true });

const { NODE_ENVIROMMENT, email } = process.env;

export const PRODUCTION_ENV = "production";
export const DEVELOPMENT_ENV = "development";

// Environments
export const environments = NODE_ENVIROMMENT || DEVELOPMENT_ENV;

export const EMAIL = email;
