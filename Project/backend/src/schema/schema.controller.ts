import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { Response } from 'express';
import { readFile } from 'fs/promises';

@Controller('schema')
export class SchemaController {
	constructor(private readonly schemaService: SchemaService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.User, Role.Admin)
	@Auth()
	@Get()
	async getAll(id: number) {
		const databases = await this.schemaService.getAllSchemas();
		const databaseWithSchemas = await Promise.all(
			databases.map(async db => {
				const fileContent = await readFile(db.image_path);
				return {
					...db,
					schema: fileContent.toString('base64')
				}
			})
		)

		return databaseWithSchemas;
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User, Role.Admin)
	@Auth()
	@Get(':id')
	async getSchemaByTaskId(id: number, @Res() res: Response) {
		const fileName = (await this.schemaService.getSchemaByTaskId(id)).image_path;
		return res.sendFile(fileName, {
			root: '.'
		});
	}
}
