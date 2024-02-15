import { Role, UserRole } from '@prisma/client';
import { UserResponse } from 'src/users/interfaces/user.interface';

export type UserRoleResponse = Pick<UserRole, 'roleId' | 'userId'>;
export type UserRoleExtResponse = UserRoleResponse & {
  user: Pick<UserResponse, 'email' | 'login'>;
  role: Pick<Role, 'title'>;
};
