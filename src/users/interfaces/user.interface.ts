import { Role, User } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';
import { UserRoleResponse } from 'src/user-roles/interfaces/user-roles.interface';

export type UserResponse = Omit<User, ServiceDates | 'password'>;
export type UserWithRolesResponse = UserResponse & {
  userRoles: Array<
    Pick<UserRoleResponse, 'id'> & {
      role: Omit<Role, ServiceDates>;
    }
  >;
};
