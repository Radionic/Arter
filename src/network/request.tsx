export default abstract class Request<Result> {
    abstract make(): Promise<Result>

    protected abstract handleResponse(resData: any): Result
}