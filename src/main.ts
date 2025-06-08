import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {BadRequestException, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          const formattedErrors = errors.map(err => ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
          }));

          return new BadRequestException({
            statusCode: 400,
            message: 'Validation failed',
            errors: formattedErrors,
          });
        },
      }),
  );
  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
