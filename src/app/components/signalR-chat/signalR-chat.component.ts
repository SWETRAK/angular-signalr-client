import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IncomingInterface } from 'src/app/interfaces/IncomingInterface';
import { OutgoingMessageInterface } from 'src/app/interfaces/OutgoingMessageInterface';
import { MessageHttpService } from 'src/app/services/message-http.service';
import { SignalRService } from 'src/app/services/signalR.service';

@Component({
    selector: 'app-signalR-chat',
    templateUrl: './signalR-chat.component.html',
    styleUrls: ['./signalR-chat.component.css']
})
export class SignalRChatComponent implements OnInit {

    public message?: IncomingInterface;

    public messages: IncomingInterface[] = [];
    public messageGroup: FormGroup;

    constructor(
        private signalRService: SignalRService,
        private messagesHttpService: MessageHttpService,
        private formBuilder: FormBuilder
    ) {
        this.messageGroup = this.formBuilder.group({
            author: [''],
            message: [''],
        });
    }

    ngOnInit() {

        this.loadPreviousMessages();
        this.startSignalRCommunication();
    }

    public sendMessage() {
        if (this.messageGroup.get('author')?.value && this.messageGroup.get('message')?.value) {
            let message: OutgoingMessageInterface = {
                author: this.messageGroup.get('author')?.value,
                message: this.messageGroup.get('message')?.value,
                sendTime: new Date()
            }
            this.messageGroup.get('message')?.reset();
            this.messagesHttpService.sendMessage(message, (data: any) => { });
        } else {
            console.warn("Not empty fields");
        }
    }

    private startSignalRCommunication() {
        this.signalRService.createConnection();
        this.signalRService.addEventListener((incomingMessage: IncomingInterface) => {
            this.messages.push(incomingMessage);
        });
    }

    private loadPreviousMessages() {
        this.messagesHttpService.getAllMessages((data: Array<IncomingInterface>) => {
            this.messages = data;
        });
    }
}
