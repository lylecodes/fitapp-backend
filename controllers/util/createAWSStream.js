const AWS = require("aws-sdk");
const { SmartStream } = require("./SmartStream");

async function createAWSStream(mediaName) {
  return new Promise((resolve, reject) => {
    const bucketParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: mediaName,
    };

    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      s3.headObject(bucketParams, (error, data) => {
        if (error) {
          throw error;
        }

        const stream = new SmartStream(bucketParams, s3, data.ContentLength);

        resolve(stream);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = createAWSStream;
