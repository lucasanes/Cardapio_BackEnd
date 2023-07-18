const fs = require('fs');
const path = require('path');
const uploadConfig = require("../config/upload");
const AppError = require('../utils/AppError');
const { promisify } = require('util');

class DiskStorage {
  async saveFile(file) {
    try {

      await fs.promises.rename(
        path.resolve(uploadConfig.TMP_FOLDER, file),
        path.resolve(uploadConfig.UPLOADS_FOLDER, file)
      );
      
      return file;
    } catch (error) {
      console.log(error)
      throw new AppError(error)
    }
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
