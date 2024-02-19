import { UserRole } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';
import { RoleResponse } from 'src/roles/interfaces/role.interface';
import { UserResponse } from 'src/users/interfaces/user.interface';

export type UserRoleResponse = Omit<UserRole, ServiceDates>;
export type WithRoleResponse = {
  role: RoleResponse;
};
export type WithUserResponse = {
  user: UserResponse;
};
export type UserRoleExtResponse = Pick<UserRoleResponse, 'id'> &
  WithRoleResponse &
  WithUserResponse;
