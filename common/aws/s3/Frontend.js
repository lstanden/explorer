const { aws: config } = require("../../config");

const KEY_CLADES = "clades";
const KEY_TEMP = "temp";

module.exports = class Frontend {
  static getBucketName() {
    return config.bucket;
  }

  static getBucketUrl() {
    return `//${this.getBucketName()}.s3.amazonaws.com`;
  }

  static getTempUrl(assetId) {
    return `${this.getBucketUrl()}/${KEY_TEMP}/${assetId}`;
  }

  static getCladeUrl(cladeId, assetId) {
    return `${this.getBucketUrl()}/${KEY_CLADES}/${cladeId}/${assetId}`;
  }
};
