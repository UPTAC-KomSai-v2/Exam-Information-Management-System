import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

const JWT_SECRET = 'maroon-book-jwt-secret';
const NOTIFY_HASH_SALT = 'maroon-book-salt';

export const userRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            // Bad practice, but this is just a
            // demo app
            password: z.string().min(1),
        }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, input.id),
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Check password via BCrypt
            const validPassword = await bcrypt.compare(input.password, user.passwordHash);

            if (!validPassword) {
                throw new Error('Invalid password');
            }

            const notifyNonce = Date.now().toString() + '-' + user.id;
            const notifyToken = crypto.createHash('sha256')
                .update(NOTIFY_HASH_SALT + user.id + user.role + notifyNonce)
                .digest('hex');

            const authToken = jwt.sign({
                id: user.id,
                role: user.role,
            }, JWT_SECRET);

            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,

                // JWT for API Authentication
                authToken,

                // Credentials for Notification Web Socket Server
                notify: {
                    signature: notifyToken,
                    nonce: notifyNonce,
                }
            };
        }),
    getNotifyToken: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };

                // Generate notify token
                const notifyNonce = Date.now().toString() + '-' + id;
                const notifyToken = crypto.createHash('sha256')
                    .update(NOTIFY_HASH_SALT + id + role + notifyNonce)
                    .digest('hex');

                return {
                    signature: notifyToken,
                    nonce: notifyNonce,
                };
            } catch {
                throw new Error('Invalid token');
            }
        }),
});
