import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { assignedExams, employees, examQuestions, exams, students, users } from "~/server/db/schema";
import type { Course, UserExamData } from "~/app/data/data";

const JWT_SECRET = 'maroon-book-jwt-secret';
const NOTIFY_HASH_SALT = 'maroon-book-salt';

function generateAuthToken(userId: number, role: string): string {
    return jwt.sign({
        id: userId,
        role,
    }, JWT_SECRET);
}

function generateNotifyToken(userId: number, role: string): {
    signature: string;
    nonce: string;
} {
    const nonce = Date.now().toString() + '-' + userId;
    const signature = crypto.createHash('sha256')
        .update(NOTIFY_HASH_SALT + userId + role + nonce)
        .digest('hex');

    return {
        signature,
        nonce,
    };
}

function wrapSuccess<T>(data: T): {
    status: 'ok';
    data: T;
} {
    return {
        status: 'ok',
        data,
    };
}

function wrapError(message: string): {
    status: 'error';
    message: string;
} {
    return {
        status: 'error',
        message,
    };
}

export const userRouter = createTRPCRouter({
    loginStudent: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            // Bad practice, but this is just a
            // demo app
            password: z.string().min(1),
        }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.users.findFirst({
                where: (users, { and, eq }) => and(
                    eq(users.id, input.id),
                    eq(users.role, 'student'),
                ),
            });

            const userDetails = await ctx.db.query.students.findFirst({
                where: (students, { eq }) => eq(students.id, input.id),
            });

            if (!user) {
                return wrapError('User not found');
            }

            // Check password via BCrypt
            const validPassword = await bcrypt.compare(input.password, user.passwordHash);

            if (!validPassword) {
                return wrapError('Invalid password');
            }

            return wrapSuccess({
                id: user.id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,

                // JWT for API Authentication
                authToken: generateAuthToken(user.id, user.role),

                // Credentials for Notification Web Socket Server
                notify: generateNotifyToken(user.id, user.role),

                details: {
                    campus: userDetails?.campus ?? '',
                    program: userDetails?.program ?? '',
                },
            });
        }),

    loginEmployee: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            // Bad practice, but this is just a
            // demo app
            password: z.string().min(1),
        }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.users.findFirst({
                where: (users, { and, eq }) => and(
                    eq(users.id, input.id),
                    eq(users.role, 'employee'),
                ),
            });

            const userDetails = await ctx.db.query.employees.findFirst({
                where: (employees, { eq }) => eq(employees.id, input.id),
            });

            if (!user) {
                return wrapError('User not found');
            }

            // Check password via BCrypt
            const validPassword = await bcrypt.compare(input.password, user.passwordHash);

            if (!validPassword) {
                return wrapError('Invalid password');
            }

            return wrapSuccess({
                id: user.id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,

                // JWT for API Authentication
                authToken: generateAuthToken(user.id, user.role),

                // Credentials for Notification Web Socket Server
                notify: generateNotifyToken(user.id, user.role),

                details: {
                    campus: userDetails?.campus ?? '',
                    division: userDetails?.division ?? '',
                },
            });
        }),

    getNotifyToken: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                return wrapSuccess(generateNotifyToken(id, role));
            } catch {
                return wrapError('Invalid auth token');
            }
        }),
    
    register: publicProcedure
        .input(z.object({
            id: z.number().int().positive(),
            firstName: z.string().min(1),
            middleName: z.string().optional(),
            lastName: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(6),
            role: z.enum(['employee', 'student']),
            campus: z.string().min(1),
            programOrDivision: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            const existingUserById = await ctx.db.query.users.findFirst({
                where: (users, { eq }) => eq(users.id, input.id),
            });

            if (existingUserById) {
                return wrapError('User ID already exists');
            }

            const existingUserByEmail = await ctx.db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, input.email),
            });

            if (existingUserByEmail) {
                return wrapError('Email already registered');
            }

            const passwordHash = await bcrypt.hash(input.password, 10);

            await ctx.db.insert(users).values({
                id: input.id,
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName,
                email: input.email,
                passwordHash,
                role: input.role,
            });

            // @ts-expect-error: This is fine, we will always set details based on role
            let details: {
                campus: string;
                division: string;
            } | {
                campus: string;
                program: string;
            } = {};
            if (input.role === 'student') {
                await ctx.db.insert(students).values({
                    id: input.id,
                    campus: input.campus,
                    program: input.programOrDivision,
                });

                details = {
                    campus: input.campus,
                    program: input.programOrDivision,
                };
            } else if (input.role === 'employee') {
                await ctx.db.insert(employees).values({
                    id: input.id,
                    campus: input.campus,
                    division: input.programOrDivision,
                });

                details = {
                    campus: input.campus,
                    division: input.programOrDivision,
                };
            }

            return wrapSuccess({
                id: input.id,
                firstName: input.firstName,
                middleName: input.middleName,
                lastName: input.lastName,
                email: input.email,

                // JWT for API Authentication
                authToken: generateAuthToken(input.id, input.role),

                // Credentials for Notification Web Socket Server
                notify: generateNotifyToken(input.id, input.role),

                details,
            });
        }),
    
    // Employee
    getEmployeeCourses: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                if (role !== 'employee') {
                    return wrapError('User is not an employee');
                }

                const coursesTaught = await ctx.db.query.courses.findMany({
                    where: (courses, { eq }) => eq(courses.courseEmployeeID, id),
                    with: {
                        sections: {
                            with: {
                                enrollments: true,
                            }
                        }
                    }
                });

                for (const course of coursesTaught) {
                    for (const section of course.sections) {
                        // @ts-expect-error: This is fine, we will always set studentsEnrolled to a number[]
                        section.studentsEnrolled = section.enrollments.map(enrollment => enrollment.studentID);
                    }
                }

                return wrapSuccess(coursesTaught as unknown as Course[]);
            } catch {
                return wrapError('Invalid auth token');
            }
        }),
    
    getEmployeeExams: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                if (role !== 'employee') {
                    return wrapError('User is not an employee');
                }

                const courses = await ctx.db.query.courses.findMany({
                    where: (courses, { eq }) => eq(courses.courseEmployeeID, id),
                    with: {
                        sections: {
                            with: {
                                exams: {
                                    with: {
                                        exam: {
                                            with: {
                                                questions: true,
                                                scores: true,
                                                assigned: true,
                                            }
                                        },
                                    }
                                },
                            }
                        }
                    }
                });

                const exams = courses.flatMap(course => 
                    course.sections.flatMap(section => 
                        section.exams.flatMap(assignedExam => assignedExam.exam)
                    )
                );

                return wrapSuccess(exams as UserExamData[]);
            } catch {
                return wrapError('Invalid auth token');
            }
        }),
    
    createExam: publicProcedure
        .input(z.object({
            token: z.string(),
            exam: z.object({
                examTitle: z.string().min(1),
                timeAllotted: z.string().min(1),
                dueDate: z.string().min(1),
                courseID: z.number().int().positive(),
                assigned: z.array(z.object({
                    sectionID: z.number().int().positive(),
                })),
                questions: z.array(z.object({
                    points: z.number().int().positive(),
                    questionData: z.union([
                        z.object({
                            type: z.literal('multiple-choice'),
                            question: z.string().min(1),
                            options: z.array(z.string().min(1)).length(4),
                        }),
                        z.object({
                            type: z.literal('short-answer'),
                            question: z.string().min(1),
                            wordLimit: z.number().int().positive().optional(),
                        }),
                        z.object({
                            type: z.literal('paragraph'),
                            question: z.string().min(1),
                            wordLimit: z.number().int().positive().optional(),
                        }),
                    ]),
                })),
            }),
        }))
        .mutation(async ({ ctx, input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                if (role !== 'employee') {
                    return wrapError('User is not an employee');
                }

                const targetCourse = await ctx.db.query.courses.findFirst({
                    where: (courses, { and, eq }) => and(
                        eq(courses.courseID, input.exam.courseID),
                        eq(courses.courseEmployeeID, id),
                    ),
                });

                if (!targetCourse) {
                    return wrapError('Course not found or user is not the instructor for the course');
                }

                let success = false;

                await ctx.db.transaction(async (tx) => {
                    const examEntry = await tx.insert(exams).values({
                        courseID: input.exam.courseID,
                        examTitle: input.exam.examTitle,
                        timeAllotted: input.exam.timeAllotted,
                        dueDate: input.exam.dueDate,
                    }).returning();

                    if (examEntry.length === 0) {
                        tx.rollback();
                        return;
                    }

                    for (const assigned of input.exam.assigned) {
                        await tx.insert(assignedExams).values({
                            examID: examEntry[0]!.examID,
                            sectionID: assigned.sectionID,
                        });
                    }

                    for (const question of input.exam.questions) {
                        await tx.insert(examQuestions).values({
                            examID: examEntry[0]!.examID,
                            points: question.points,
                            questionData: question.questionData,
                        });
                    }

                    success = true;
                });

                if (success) {
                    return wrapSuccess({});
                } else {
                    return wrapError('Failed to create exam');
                }
            } catch {
                return wrapError('Invalid auth token');
            }
        }),

    // Student
    getStudentCourses: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                if (role !== 'student') {
                    return wrapError('User is not a student');
                }

                const enrollments = await ctx.db.query.enrollments.findMany({
                    where: (enrollments, { eq }) => eq(enrollments.studentID, id),
                    with: {
                        section: {
                            with: {
                                course: {
                                    with: {
                                        sections: {
                                            with: {
                                                enrollments: true,
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                });

                const coursesEnrolled = enrollments.map(enrollment => enrollment.section.course);

                for (const course of coursesEnrolled) {
                    for (const section of course.sections) {
                        // @ts-expect-error: This is fine, we will always set studentsEnrolled to a number[]
                        section.studentsEnrolled = section.enrollments.map(enrollment => enrollment.studentID);
                    }

                    course.sections = course.sections.filter(section => 
                        section.enrollments.some(enrollment => enrollment.studentID === id)
                    );
                }

                return wrapSuccess(coursesEnrolled as unknown as Course[]);
            } catch {
                return wrapError('Invalid auth token');
            }
        }),
    
    getStudentExams: publicProcedure
        .input(z.object({
            token: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            // Verify JWT token
            try {
                const { id, role } = jwt.verify(input.token, JWT_SECRET) as { id: number, role: string };
                if (role !== 'student') {
                    return wrapError('User is not a student');
                }

                const enrollments = await ctx.db.query.enrollments.findMany({
                    where: (enrollments, { eq }) => eq(enrollments.studentID, id),
                    with: {
                        section: {
                            with: {
                                course: {
                                    with: {
                                        sections: {
                                            with: {
                                                exams: {
                                                    with: {
                                                        exam: {
                                                            with: {
                                                                questions: true,
                                                                scores: {
                                                                    where: (scores, { eq }) => eq(scores.studentID, id),
                                                                },
                                                                assigned: true,
                                                            }
                                                        },
                                                    }
                                                },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });

                const exams = enrollments.flatMap(enrollment => 
                    enrollment.section.course.sections.flatMap(section => 
                        section.exams.flatMap(assignedExam => assignedExam.exam)
                    )
                );

                return wrapSuccess(exams as UserExamData[]);
            } catch {
                return wrapError('Invalid auth token');
            }
        }),
});
