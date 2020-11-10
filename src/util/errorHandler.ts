import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		success: false,
		payload: err.payload,
		error: err.message || 'Server Error',
	});
};
