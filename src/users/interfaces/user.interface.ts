import { Role, User } from '@prisma/client';
import { UserRoleResponse } from 'src/user-roles/interfaces/user-roles.interface';

export type UserResponse = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
export type UserExtWithRolesResponse = UserResponse & {
  userRoles: Array<
    UserRoleResponse & {
      role: Pick<Role, 'title'>;
    }
  >;
};
