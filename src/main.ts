import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 4000;

async function server() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}
server();
