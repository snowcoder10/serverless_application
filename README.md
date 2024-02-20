# serverless_application
A basic serverless application which processes uploads to an S3 bucket and populates a DB with metadata. Illustrates some basic Pulumi implementations.

## Bucket
The `Bucket.ts` ComponentResource is a reusable object for creating AWS S3 Buckets. This comes with a read policy.

## Database
The `Database.ts` ComponentResource is a resusable object for creating a Postgresql database in AWS RDS. 

For sake of time, use `sql/create_tables.sql` to create the necessary tables on the database.

## Lambda Function
`ProcessUpload.ts` contains the function which is used in the Lambda. This Lambda is triggered by an upload to the S3 Bucket. The function requires the DB connection info as arguments.


## Known Issues
Having issues connecting to the RDS instance. Cannot connect via local editor or Lambda. Might be an issue with the security groups, not sure. Tried adding an inbound rule to allow all traffic on all IP to no success.

There is likely a better way to pass the connection info to the lambda function. This was quick and dirty (and obviously not working).