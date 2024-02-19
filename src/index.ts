import { Bucket } from './Bucket'
import { Database } from './Database'


const bucket = new Bucket('serverless-bucket', {});
const database = new Database('serverless-database', {});

export const bucketName = bucket.bucket.id;
export const databaseName = database.database.dbName;