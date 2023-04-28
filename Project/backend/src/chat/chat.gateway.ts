import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { ChatDto } from './dto/chat.dto';

@WebSocketGateway()
export class ChatGateway {
	@WebSocketServer() server: Server;

	constructor(private readonly chatService: ChatService) { }

	@SubscribeMessage('message')
	async handleMessage(client: any, dto: ChatDto) {
		const message = await this.chatService.create(dto);
		this.server.emit(`discussion-${dto.discussionId}-message`, message);
	}

	@SubscribeMessage('join')
	async handleJoin(client: any, discussionId: number) {
		client.join(`discussion-${discussionId}`);
	}

	@SubscribeMessage('leave')
	async handleLeave(client: any, discussionId: number) {
		client.leave(`discussion-${discussionId}`);
	}
}
