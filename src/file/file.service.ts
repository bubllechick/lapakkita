import { Injectable } from '@nestjs/common';
import { InjectMinioClient } from '@svtslv/nestjs-minio';
import { MinioClient } from 'nestjs-minio-client';
import * as crypto from 'crypto';


@Injectable()
export class FileService {
    constructor(@InjectMinioClient() private readonly minioClient: MinioClient) { }


    public async uploadImage(base64image: string, folderPath: string) {
        return new Promise(async (resolve, reject) => {
            const bufferImage = Buffer.from(base64image, 'base64');
            const findExtension = await this.fileHeader(base64image)
            const temp_filename = Date.now().toString();
            const hashedFileName = crypto
                .createHash('md5')
                .update(temp_filename)
                .digest('hex');
            const filename = folderPath + '/' + hashedFileName + '.' + findExtension;
            const urlPath =
                'https://' +
                process.env.ENDPOINT_MINIO +
                '/' +
                process.env.BASE_BUCKET +
                '/' +
                filename;
            console.log(urlPath);

            const metaData = {
                'Content-Type': 'image',
            };

            this.minioClient.putObject(
                process.env.BASE_BUCKET,
                filename,
                bufferImage,
                undefined,
                metaData,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(new Error(err.message));
                    }
                    console.log(res);

                    resolve({
                        image_path: filename,
                        urlPath,
                        hashedFileName: `${hashedFileName}.` + `${findExtension}`,
                    });
                },
            );
        });
    }

    async fileHeader(file) {
        let fileHeader = new Map()
        fileHeader.set("/9j", "jpg")
        fileHeader.set("iVB", "png")
        fileHeader.set("Qk0", "bmp")
        fileHeader.set("SUk", "tiff")
        fileHeader.set("JVB", "pdf")
        fileHeader.set("UEs", "ofd")
        let res = ""
        fileHeader.forEach((v, k) => {
            if (k == file.substr(0, 3)) { res = v }
        })
        if (res == "") { res = "unknown file" } return res;
    }

    async delete(file: string, folderPath: string) {
        const filename = folderPath + '/' + file;
        const urlPath =
            'https://' + process.env.ENDPOINT_MINIO +
            '/' + process.env.BASE_BUCKET +
            '/' + folderPath + '/'
        const bucket = process.env.BASE_BUCKET
        var message = '';
        return await this.minioClient.removeObject(
            bucket,
            filename,
            function (err) {
                if (err) {
                    return console.log('Unable to remove incomplete object', err)
                }
                // console.log('Success')
                return message = 'Success';
            }
        );
    }
}
