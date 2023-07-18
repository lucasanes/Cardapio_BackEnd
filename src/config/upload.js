const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const originalNameArray = file.originalname.split('.')
      const extensao = originalNameArray[originalNameArray.length - 1]
      let name = '' 
      originalNameArray.forEach((each, i) => {
        if (i != originalNameArray.length - 1) {
          name += each
        }
      })
      const fileName = `https://cardapiobackend.up.railway.app/${name}-${fileHash}.${extensao}`;

      return callback(null, fileName);
    }
  })
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
};
