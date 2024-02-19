import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { S3Endpoint } from "@pulumi/aws/dms";

export class Bucket extends pulumi.ComponentResource {
  public bucket: aws.s3.Bucket;
  private bucketReadPolicy: aws.s3.BucketPolicy;

  private publicReadPolicyForBucket = (bucketName: string) => {
    return JSON.stringify({
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Principal: "*",
        Action: [
          "s3:GetObject"
        ],
        Resource: [
          `arn:aws:s3:::${bucketName}/*` // policy refers to bucket name explicitly
        ]
      }]
    });
  }
  constructor(name: string, opts: pulumi.ComponentResourceOptions) {
    super("pkg:index:Bucket", name, {}, opts);

    this.bucket = new aws.s3.Bucket(`${name}-bucket`,
      {/*...*/ }, { parent: this });

    this.bucketReadPolicy = new aws.s3.BucketPolicy(`${name}-bucket-policy`, {
      bucket: this.bucket.bucket,
      policy: this.bucket.bucket.apply(this.publicReadPolicyForBucket)
    });

    this.registerOutputs({
      bucketDnsName: this.bucket.bucketDomainName,
      bucketReadPolicy: this.bucketReadPolicy.policy
    });
  }
}