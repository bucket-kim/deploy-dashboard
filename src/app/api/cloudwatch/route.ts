import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} from "@aws-sdk/client-cloudwatch";
import { NextResponse } from "next/server";

const client = new CloudWatchClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const GET = async () => {
  const endTime = new Date();
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - 7);

  try {
    const requestsCommand = new GetMetricStatisticsCommand({
      Namespace: "AWS/CloudFront",
      MetricName: "Requests",
      Dimensions: [
        {
          Name: "DistributionId",
          Value: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID!,
        },
        {
          Name: "Region",
          Value: "Global",
        },
      ],
      StartTime: startTime,
      EndTime: endTime,
      Period: 86400,
      Statistics: ["Sum"],
    });

    const cacheHitCommand = new GetMetricStatisticsCommand({
      Namespace: "AWS/CloudFront",
      MetricName: "CacheHitRate",
      Dimensions: [
        {
          Name: "DistributionId",
          Value: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID!,
        },
        {
          Name: "Region",
          Value: "Global",
        },
      ],
      StartTime: startTime,
      EndTime: endTime,
      Period: 86400,
      Statistics: ["Average"],
    });

    const [requestsResponse, cacheHitResponse] = await Promise.all([
      client.send(requestsCommand),
      client.send(cacheHitCommand),
    ]);

    return NextResponse.json({
      requests: requestsResponse.Datapoints ?? [],
      cacheHitRate: cacheHitResponse.Datapoints ?? [],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch Cloudwatch metrics",
      },
      {
        status: 500,
      },
    );
  }
};
