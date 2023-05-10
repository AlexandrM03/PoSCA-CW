import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { SchemaController } from './schema.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [SchemaController],
	providers: [SchemaService, PrismaService]
})
export class SchemaModule { }
