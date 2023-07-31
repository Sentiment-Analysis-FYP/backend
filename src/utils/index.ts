export interface UploadedFile {
    name: string,
    data: Buffer,
    size: number,
    encoding: string,
    tempFilePath: string
}

export interface ScrapeParameters {
    username: string,
    keywords: string[],
    startDate?: Date,
    endDate?: Date,
    email: string,
    title?: string,
    maxTweets?: number
}