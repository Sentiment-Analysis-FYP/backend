export interface UploadedFile {
    name: string,
    data: Buffer,
    size: number,
    encoding: string,
    tempFilePath: string
}