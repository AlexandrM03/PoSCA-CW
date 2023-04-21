import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	app.setGlobalPrefix('api');
	app.enableCors();

	const swaggerOptions = new DocumentBuilder()
		.setTitle('API')
		.setDescription('API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(4200);
}
bootstrap();