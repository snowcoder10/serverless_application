import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { S3Endpoint } from "@pulumi/aws/dms";

export class Bucket extends pulumi.ComponentResource {
  public bucket: aws.s3.Bucket;

  constructor(name: string, opts: pulumi.ComponentResourceOptions) {
    super("pkg:index:Bucket", name, {}, opts);

    this.bucket = new aws.s3.Bucket(`${name}-bucket`,
      {}, { parent: this });

    this.registerOutputs({
      bucketDnsName: this.bucket.bucketDomainName
    });
  }
}