import { SetMetadata } from '@nestjs/common';

import { RoleTypes } from '../../database/db.enums';

export const ROLES_KEY = 'roles';

export const HasRoles = (...roles: RoleTypes[]) =>
  SetMetadata(ROLES_KEY, roles);
