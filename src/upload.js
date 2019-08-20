import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const avatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "prismagram-s/avatar",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

const feed = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "prismagram-s/feed",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+Math.random());
    }
  }),
});


export const uploadAvatarMiddleware = avatar.single("file");

export const uploadAvatarController = (req, res) => {
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  const { file: { location } }  = req;

  res.json({ location });
};

export const uploadImageMiddleware = feed.array("file");

export const uploadImageController = (req, res) => {
  const { files } = req;
  const location = files.map(el => {
    return el.location
  })
  res.json({ location })
};
