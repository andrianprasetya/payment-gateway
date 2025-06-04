export class ResponseSuccess<T = any> {
    success: true;
    message: string;
    data?: T;

    constructor(message: string, data?: T) {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}