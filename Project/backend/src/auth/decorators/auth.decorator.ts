import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enum/role.enum';
import { RolesGuard } from './role.decorator';

export const Auth = () => UseGuards(AuthGuard('jwt'));
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);