import { CreateRoomDto } from './create-rooms.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
