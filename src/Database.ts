import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { S3Endpoint } from "@pulumi/aws/dms";

export class Database extends pulumi.ComponentResource {
  public database: aws.rds.Instance;

  constructor(name: string, opts: pulumi.ComponentResourceOptions) {
    super("pkg:index:Database", name, {}, opts);

    this.database = new aws.rds.Instance("default", {
      allocatedStorage: 10,
      dbName: name,
      engine: "postgresql",
      engineVersion: "16.2",
      instanceClass: "db.t3.micro",
      parameterGroupName: "default.postgres16.2",
      password: "foobarbaz",
      skipFinalSnapshot: true,
      username: "foo",
    });

    this.registerOutputs({
      databaseName: this.database.dbName
    });
  }
}