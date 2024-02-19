import { Role } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';

export type RoleResponse = Omit<Role, ServiceDates>;
