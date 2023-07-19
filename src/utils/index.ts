export interface UploadedFile {
    name: string,
    data: Buffer,
    size: number,
    encoding: string,
    tempFilePath: string
}

export interface ScrapeParameters {
    keywords: string[],
    startDate?: Date,
    endDate?: Date
}