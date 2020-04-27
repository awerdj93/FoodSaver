import { Message } from '../models';

export class Chat {
    id?: number;
    recipientId?: number;
	recipientName?: string;
    sender?: number;
    lastMessage: Message;
    messages: Array<Message>
    
    constructor() {}
}