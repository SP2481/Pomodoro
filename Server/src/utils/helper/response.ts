export interface ResponseStructure<T>{
    success: boolean;
    statusCode: number;
    data?:T
}