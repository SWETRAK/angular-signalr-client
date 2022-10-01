import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IncomingInterface } from '../interfaces/IncomingInterface';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    constructor() { }

    private connection: signalR.HubConnection | undefined;

    private connectionSettings = {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    }

    public createConnection() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7111/hubs/messages", this.connectionSettings)
            .build();
        this.connection.start();
    }

    public addEventListener(callback: Function) {
        this.connection?.on("receiveMessages", (result: IncomingInterface) => {
            callback(result);
        });
    }
}
