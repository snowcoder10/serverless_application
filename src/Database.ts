import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";


export class Database extends pulumi.ComponentResource {
  public database: aws.rds.Instance;

  constructor(name: string, opts: pulumi.ComponentResourceOptions) {
    super("pkg:index:Database", name, {}, opts);

    const config = new pulumi.Config();
    const dbUser = config.require("dbUser");
    const dbPassword = config.requireSecret("dbPassword");

    this.database = new aws.rds.Instance("default", {
      allocatedStorage: 10,
      dbName: name,
      engine: "postgres",
      engineVersion: "15",
      instanceClass: "db.t3.micro",
      parameterGroupName: "default.postgres15",
      password: pulumi.interpolate`${dbPassword}`,
      skipFinalSnapshot: true,
      username: dbUser,
    });

    this.registerOutputs({
      databaseName: this.database.dbName,
      databaseEndpoint: this.database.endpoint,
      databaseUsername: this.database.username,
      databasePassword: this.database.password,
    });
  }
}