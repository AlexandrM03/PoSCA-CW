import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { ChatMessageDto } from 'src/app/dto/chat-message.dto';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
	messages: ChatMessageDto[] = [];
	newMessage: string = '';
	discussionId: number = 0;
	userId: number = 0;
	username: string = '';

	@ViewChild('chatContainer') chatContainer: any;

	private socket: Socket | null = null;

	constructor(
		private route: ActivatedRoute,
		private tokenStorage: TokenStorageService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.discussionId = params['id'];
			this.socket = io(`http://localhost:3000?discussionId=${this.discussionId}`, {
				transports: ['websocket'],
				withCredentials: true,
				extraHeaders: {
					'Access-Control-Allow-Origin': 'http://localhost:4200'
				}
			});
			this.socket.on('loadMessages', (messages: ChatMessageDto[]) => {
				this.messages = messages;
				console.log(this.messages)
			});
			this.socket.on('newMessage', (message: ChatMessageDto) => {
				this.messages.push(message);
			});
		});
		this.userId = this.tokenStorage.getUserId();
		this.username = this.tokenStorage.getUser();
	}

	ngAfterViewInit() {
		setTimeout(() => this.scrollToBottom(), 150);
	}

	scrollToBottom() {
		this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
	}

	sendMessage(): void {
		if (this.newMessage.trim()) {
			const message = {
				content: this.newMessage,
				userId: this.userId,
				discussionId: this.discussionId
			};
			this.newMessage = '';
			this.socket?.emit('writeMessage', message);
		}
	}
}
