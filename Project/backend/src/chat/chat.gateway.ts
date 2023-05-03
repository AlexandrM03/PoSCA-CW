import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly chatService: ChatService) { }

	async handleConnection(socket: Socket) {
		const discussionId = socket.handshake.query.discussionId;
		socket.join(`discussion-${discussionId}`);
		const messages = await this.chatService.findAll(+discussionId);
		socket.emit('loadMessages', messages);
	}

	async handleDisconnect(socket: Socket) {
		const discussionId = socket.handshake.query.discussionId;
		socket.leave(`discussion-${discussionId}`);
	}

	async sendMessage(dto: MessageDto) {
		const message = await this.chatService.create(dto);
		this.server.to(`discussion-${dto.discussionId}`).emit('newMessage', message);
	}

	@SubscribeMessage('writeMessage')
	async onMessage(client: Socket, dto: MessageDto) {
		await this.sendMessage(dto);
	}
}