import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [DiscussionController],
	providers: [DiscussionService, PrismaService]
})
export class DiscussionModule { }
