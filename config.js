// import("dotenv").config({ silent: true });

import dotenv from "dotenv";
dotenv.config({ silent: true });

const {
  NODE_ENV,
  NODE_ENVIROMMENT,
  PORT,
  DATABASE,
  AWS_KEY_ID,
  AWS_SECRET_KEY_ACCESS,
  AWS_BUCKET,
  AWS_REGION,
  email,
  password,
  FROM_EMAIL,
  SENDGRID_API_KEY,
} = process.env;


export const PRODUCTION_ENV = "production";
export const DEVELOPMENT_ENV = "development";

// Environments
export const environments = NODE_ENVIROMMENT || DEVELOPMENT_ENV;

// AWS Settings
export const awsRegion = AWS_REGION || "ap-south-1";
export const awsAccessKeyId = AWS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_KEY_ACCESS;
export const awsBucketName = AWS_BUCKET;
export const fromEmail = FROM_EMAIL;
export const sendGridKey = SENDGRID_API_KEY;

export const EMAIL = email;
export const PASSWORD = password;
