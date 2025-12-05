import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import crypto from 'crypto';

// Salt for hashing
// This should normally be behind an env variable
// but for this demo application we can just
// hardcode it tbh - James
const salt = 'maroon-book-salt';

enum MessageType {
    CONNECTION = 'connection',
};

type UserRole = 'employee' | 'student';

type MessageBase<TType extends MessageType, TPayload> = {
    type: TType;
    payload: TPayload;
};

type ConnectionMessage = MessageBase<MessageType.CONNECTION, {
    user: {
        id: string;
        role: UserRole;
    },
    auth: {
        signature: string;
        nonce: string;
    }
}>;

function validateConnection(message: ConnectionMessage): boolean {
    const { user, auth } = message.payload;
    const expectedSignature = crypto.createHash('sha256');
    expectedSignature.update(salt + user.id + user.role + auth.nonce);
    const computedSignature = expectedSignature.digest('hex');
    return computedSignature === auth.signature;
}

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
    console.log('[maroon-book] [backend] New WebSocket connection established');

    let isAuthenticated = false;
    let authTimeout = setTimeout(() => {
        if (!isAuthenticated) {
            console.log('[maroon-book] [backend] Authentication timeout, closing connection');
            ws.close();
        }
    }, 5000);

    let userId: string | null = null;
    let userRole: UserRole | null = null;

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());

            if (message.type === MessageType.CONNECTION) {
                const connectionMessage = message as ConnectionMessage;
                if (validateConnection(connectionMessage)) {
                    isAuthenticated = true;
                    clearTimeout(authTimeout);
                    console.log('[maroon-book] [backend] Client authenticated successfully');
                    userId = connectionMessage.payload.user.id;
                    userRole = connectionMessage.payload.user.role;
                } else {
                    console.log('[maroon-book] [backend] Invalid authentication, closing connection');
                    ws.close();
                }
            } else if (!isAuthenticated) {
                console.log('[maroon-book] [backend] [backend] Received message before authentication, closing connection');
                ws.close();
            }
        } catch (error) {
            console.log('[maroon-book] [backend] Error processing message:', error);
            ws.close();
        }
    });

    ws.on('close', () => {
        console.log('[maroon-book] [backend] WebSocket connection closed');
    });
});

server.listen(3001, () => {
    console.log('[maroon-book] [backend] Server is listening on port 3001');
});
