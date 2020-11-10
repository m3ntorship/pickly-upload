export class AppError extends Error {
	statusCode: number;
	status: string;
	payload: any;
	isOperational: boolean;

	constructor(message: string, statusCode: number, payload?: any) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.payload = payload;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}
