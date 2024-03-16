import { Comment } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';
export type CommentResponse = Omit<Comment, ServiceDates>;
