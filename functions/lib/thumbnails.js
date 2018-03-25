"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const path = require("path");
const os = require("os");
const gcs = require("@google-cloud/storage");
const mkdirp = require("mkdirp-promise");
const cp = require("child-process-promise");
const fs = require("fs");
const storage = gcs({ keyFilename: 'service-account-credentials.json' });
const THUMBNAIL_MAX_HEIGHT = 300;
const THUMBNAIL_MAX_WIDTH = 600;
const THUMBNAIL_PREFIX = 'thumbnail_';
const generateThumbnail = functions.storage.object().onChange((event) => __awaiter(this, void 0, void 0, function* () {
    const filePath = event.data.name;
    const contentType = event.data.contentType;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const thumbnailFilePath = path.normalize(path.join(fileDir, `${THUMBNAIL_PREFIX}${fileName}`));
    const tempLocalFile = path.join(os.tmpdir(), thumbnailFilePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbnailFile = path.join(os.tmpdir(), thumbnailFilePath);
    // Exit if not image
    if (!contentType.startsWith('image/')) {
        console.log('Not an image');
        return null;
    }
    // Exit if thumbnail
    if (fileName.startsWith(THUMBNAIL_PREFIX)) {
        console.log('Already a thumbnail');
        return null;
    }
    // Exit if moving or deleting
    if (event.data.resourceState === 'not_exists') {
        console.log('Not adding a file');
        console.log(null);
    }
    // Cloud storage files
    const bucket = storage.bucket(event.data.bucket);
    const file = bucket.file(filePath);
    const thumbnailFile = bucket.file(thumbnailFilePath);
    const metadata = { contentType };
    try {
        yield mkdirp(tempLocalDir);
        yield file.download({ destination: tempLocalFile });
        yield cp.spawn('convert', [
            tempLocalFile,
            '-thumbnail',
            `${THUMBNAIL_MAX_WIDTH}x${THUMBNAIL_MAX_HEIGHT}>`,
            tempLocalThumbnailFile,
            {
                capture: ['stdout', 'stderr']
            }
        ]);
        yield bucket.upload(tempLocalThumbnailFile, { destination: thumbnailFilePath, metadata });
        fs.unlinkSync(tempLocalFile);
        fs.unlinkSync(tempLocalThumbnailFile);
        const config = {
            action: 'read',
            expires: '03-01-2500'
        };
        const results = yield Promise.all([
            thumbnailFile.getSignedUrl(),
            file.getSignedUrl()
        ]);
        const thumbnailResult = results[0];
        const originalResult = results[1];
        const thumbnailFileUrl = thumbnailResult[0];
        const fileUrl = originalResult[0];
        console.log({ path: fileUrl, thumbnail: thumbnailFileUrl });
    }
    catch (error) {
        console.error(error);
    }
}));
//# sourceMappingURL=thumbnails.js.map