import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './shared/config';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/shared/interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that are not in the DTO
      forbidNonWhitelisted: true, // throw an error if there are properties that are not in the DTO
      transform: true, // transform the DTO to the class instance
      transformOptions: {
        enableImplicitConversion: true, // enable implicit conversion, example: name: 123 to name: "123"
      },
      exceptionFactory: (validationeErrors) => {
        // to customize the error message
        // console.log(validationeErrors)
        return new UnprocessableEntityException(
          validationeErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any).join(', '),
          }))
        );
      },
    })
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
