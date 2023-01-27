export interface ResponseBody<T> {
    timeStamp: string,
    httpCode: number,
    httpStatus: string,
    message: string,
    data: T
}
