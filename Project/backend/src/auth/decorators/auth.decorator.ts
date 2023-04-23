import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enum/role.enum';

export const Auth = () => UseGuards(AuthGuard('jwt'));
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);