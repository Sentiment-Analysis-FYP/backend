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
    start_date?: Date,
    end_date?: Date,
    email: string,
    title?: string,
    max_tweets: string
}