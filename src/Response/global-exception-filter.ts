import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { isArray } from 'class-validator';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Define a human-readable message based on the status or type of error
    let humanReadableMessage =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'We are unable to process your request right now. Please try again later.'
        : exception.message || exception.toString();
    if (exception?.response?.message) {
      if (isArray(exception.response.message)) {
        humanReadableMessage = exception.response.message[0];
      } else {
        humanReadableMessage = exception.response.message;
      }
    }
    response.status(status).json({
      statusCode: status,
      message: humanReadableMessage, // Human-readable message for users
      data: [], // Empty array for error cases
      path: request.url,
      originalError: exception.message || exception.toString(), // Original error message for debugging
    });
  }
}
