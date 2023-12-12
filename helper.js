const util = require('util')
const gc = require('./config/Storage')
require('dotenv').config()
const bucket = gc.bucket(process.env.BUCKET)

const { format } = util

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file

  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', (err) => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)

});
/**
 * @param {string} imageName - The name of the image file to be deleted
 * @description - This function deletes an image file from Google Cloud Storage
 */

const DeleteImage = (imageName) => {
  const file = bucket.file(imageName);

  return file
    .delete()
    .then(() => {
      console.log(`File ${imageName} deleted successfully`);
    })
    .catch((err) => {
      console.error(`Error deleting file ${imageName}: ${err}`);
      throw err;
    });
};
module.exports = {uploadImage,DeleteImage}