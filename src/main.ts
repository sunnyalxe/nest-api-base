import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './Response/global-exception-filter';
import { ResponseInterceptor } from './Interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Use the response interceptor globally
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  // Use the custom exception filter for standardized error responses
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT') || 4000, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();

//https://github.com/mguay22/nestjs-typeorm/tree/main/src/database
//https://www.youtube.com/watch?v=9MGKKJTwicM
//https://github.com/zenstok/nestjs-auth-refresh-token-example/tree/main
