import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000','http://165.227.171.60:3000'],
    credentials: true,                
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  });

  await app.listen(5000); 
}
bootstrap();
