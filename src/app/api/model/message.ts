export class Message {
    id?: number;
    recipient?: number;
    message: string;
    createdBy: number;
    createdAt: Date;
    sequence: number;
    chatId: number;
   
    constructor() {}
}