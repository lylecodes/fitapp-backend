const AWS = require("aws-sdk");

exports.saveFileToS3 = (mediaName, blob) => {
  if (blob === {} || blob === undefined || blob === null) {
    console.log("No blob found");
  }
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: blob,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data}`);
  });
};
