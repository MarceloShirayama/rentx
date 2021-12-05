import { S3 } from 'aws-sdk'
import fs from 'fs'
import { resolve } from 'path'
import mime from 'mime'
import { awsConfig } from '../../../../../config/aws'
import { uploadConfig } from '../../../../../config/upload'

import { IStorageProvider } from '../IStorageProvider'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new S3({
      region: awsConfig.bucketRegion
    })
  }

  async saveFile(file: string, folder: string): Promise<string> {
    const originalName = resolve(uploadConfig.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const Bucket = `${awsConfig.bucketName}/${folder}`
    const Key = file
    const ACL = 'public-read'
    const Body = fileContent
    const ContentType = mime.getType(originalName) as string

    await this.client
      .putObject({
        Bucket,
        Key,
        ACL,
        Body,
        ContentType
      })
      .promise()

    await fs.promises.unlink(originalName)

    return file
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    const Bucket = `${awsConfig.bucketName}/${folder}`
    const Key = file

    await this.client.deleteObject({ Bucket, Key }).promise()
  }
}
