import { Bucket } from './Bucket'
import { Database } from './Database'
import * as pulumi from "@pulumi/pulumi";
import { ProcessUpload } from './ProcessUpload'


const database = new Database('serverlessdatabase', {});
const dbUser = database.database.username;
const dbPassword = database.database.password;
const dbHost = database.database.endpoint;
const dbName = database.database.dbName;
const dbUrl = pulumi.interpolate`postgresql://${dbUser}:${dbPassword}@${dbHost}/${dbName}`

const bucket = new Bucket('serverless-bucket', {});
bucket.bucket.onObjectCreated('onUploadhandler', async (e) => {
  await ProcessUpload(e.Records ?? [], dbUrl.get());
})

export const bucketName = bucket.bucket.id;
export const databaseName = database.database.dbName;
export const databaseEndpoint = database.database.endpoint;
export const databaseUrl = pulumi.interpolate`postgresql://${dbUser}:${dbPassword}@${dbHost}/${dbName}`
