const post = require("../models/PostModel");
const mongoose = require("mongoose");
const createAWSStream = require("./util/createAWSStream");
// const saveFileToS3 = require("./util/saveFileToS3");

const AWS = require("aws-sdk");

function saveFileToS3(mediaName, blob) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: mediaName,
    Body: blob,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data}`);
  });
}

// Display the detail of a post item by ID
exports.postItem = (req, res) => {
  const id = req.params.id;
  //show post, comments section, and comment input
  post
    .findById({
      _id: id,
    })
    .then((result) => {
      console.log("postRes", result);
      return res.send(result);
    })
    .catch((err) => console.error(err));
};

exports.getMedia = async (req, res) => {
  const stream = await createAWSStream(req.params.name);
  stream.pipe(res);
};

// Get create post input/form
exports.postCreateGet = (req, res) => {
  console.log("postCreateGet", req);
  res.render("./create", {
    title: "Upload an image or video",
    // render other objects
  });
};

// Create post on POST
exports.postCreatePost = (req, res) => {
  const newDate = new Date();
  // console.log(req.body);

  //   const User = mongoose.Types.ObjectId();
  const caption = req.body.caption;
  const comments = [];
  const tags = [];
  const aMediaName = `${(Math.random() * 1000).toString()}${caption.slice(
    0,
    1
  )}`;
  const dateCreated = new Date(newDate);
  // const blob = req.body.blob;
  const uri = req.body.uri;
  console.log(uri);
  // console.log("blob from request body", blob);
  // const type = blob.type;
  const mediaName = aMediaName;

  let postItem = {
    // User,
    caption,
    comments,
    tags,
    mediaName,
    dateCreated,
  };

  console.log("postItem", postItem);
  console.log(mediaName);
  // console.log(blob.type);
  try {
    saveFileToS3(mediaName, uri);

    // saveFileToS3.saveFileToS3();
    // post.create(postItem);
    return res.send(postItem);
  } catch (err) {
    throw err;
  }
};

// Get post to delete
exports.postDeleteGet = (req, res) => {
  const id = req.params.id;
  post.findById(id).then((result) => {
    console.log("deleteGet", result);
    res.render(`./post/${id}/delete`, {
      title: "Delete post",
      post: result,
    });
  });
};

// Delete post on POST
exports.postDeletePost = (req, res) => {
  const id = req.params.id;
  console.log("FromDELETE", req.params);
  post
    .findOneAndDelete({
      _id: id,
    })
    .then((result) => {
      return res.send("Deleted post id: " + req.params.id);
    })
    .catch((err) => {
      console.log(err);
    });
  // authenticated owner of post delete function here
};

// Get post to update
exports.postUpdateGet = (req, res) => {
  post.findById(req.params.id).then((result) => {
    console.log("UpdateGet", result);
    res.render("./post/update", {
      title: "Update post",
      post: result,
    });
  });
};

// Update post on POST
exports.postUpdatePost = (req, res) => {
  const newDate = new Date();
  const dateUpdated = new Date(newDate);
  console.log("FromUPDATE", req.oidc);
  post.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      caption: req.body.caption,
      url: req.body.url,
      $push: {
        tags: {
          $each: [req.body.tags],
        },
      },
      dateUpdated: dateUpdated,
    },
    (result) => {
      res.send("updatedPostId: " + req.params.id);
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Post : ", doc);
      }
    }
  );
  // authenticated owner of post delete function here
};

// Update comment post on POST
exports.postUpdateComment = (req, res) => {
  console.log("res", req.params.id);
  const id = req.params.id;
  post.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        comments: {
          user: new mongoose.Types.ObjectId(), //use req.oidc.user here instead
          comment: req.body.comment,
        },
      },
      new: true,
    },
    (result) => {
      res.send(`postedComment: ${req.body.comment}`);
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};
