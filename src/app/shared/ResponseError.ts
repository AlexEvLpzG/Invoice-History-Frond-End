interface ResponseError<T> {
    timeStamp: string,
    httpCode: number,
    HttpStatus: string,
    details: string,
    error: T
}

interface Error {
    filedName: string,
    location: string,
    message: string
}

export { ResponseError, Error }
