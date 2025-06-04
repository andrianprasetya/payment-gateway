import { ResponseSuccess } from '../dto/response-success.dto';
import { ResponseError } from '../dto/response-error.dto';
import { PaginatedResponse, PaginationMeta } from '../dto/pagination-meta.dto';

export const createdResponse = <T>(data: T, message = 'Created') =>
    new ResponseSuccess<T>(message, data);

export const successResponse = <T>(data: T, message = 'Success') =>
    new ResponseSuccess<T>(message, data);

export const errorResponse = (message = 'Something went wrong', errors?: any) =>
    new ResponseError(message, errors);

export const validationErrorResponse = (errors: Record<string, any>, message = 'Validation failed') =>
    new ResponseError(message, errors);

export const paginatedResponse = <T>(
    data: T[],
    meta: PaginationMeta,
    message = 'Success with pagination'
) => new PaginatedResponse<T>(data, meta, message);