import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OutgoingMessageInterface } from '../interfaces/OutgoingMessageInterface';
import { IncomingInterface } from '../interfaces/IncomingInterface';

@Injectable({
    providedIn: 'root'
})
export class MessageHttpService {

    constructor(
        private http: HttpClient
    ) {

    }

    public getAllMessages(callback: Function) {
        this.http.get<Array<IncomingInterface>>("https://localhost:7111/messages")
            .subscribe((data: Array<IncomingInterface>) => {
                callback(data);
            })
    }

    public sendMessage(message: OutgoingMessageInterface, callback: Function) {
        this.http.post("https://localhost:7111/messages", message).subscribe(data => {
            callback(data);
        });
    }

}
