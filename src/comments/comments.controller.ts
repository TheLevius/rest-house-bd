import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  public getAll() {
    return this.commentsService.findAll();
  }
  @Get(':id')
  public getOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOneById(id);
  }
  @Post()
  public create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }
  @Put(':id')
  public update(@Param('id', ParseUUIDPipe) id: string, dto: CreateCommentDto) {
    return this.commentsService.update(id, dto);
  }
  @HttpCode(204)
  @Delete(':id')
  public delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.delete(id);
  }
}
