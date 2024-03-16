import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CommentResponse } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

const select = {
  id: true,
  title: true,
  content: true,
  rate: true,
  stayStart: true,
  stayEnd: true,
  guestName: true,
};

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<CommentResponse[]> {
    const result = await this.prisma.comment.findMany({ select });
    return result;
  }

  public async findOneById(id: string): Promise<CommentResponse> {
    try {
      const result = await this.prisma.comment.findUniqueOrThrow({
        where: { id },
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
  }

  public async create(dto: CreateCommentDto): Promise<CommentResponse> {
    try {
      const result = await this.prisma.comment.create({
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(
        'An unexpected error occurred on the server',
      );
    }
  }

  public async update(
    id: string,
    dto: UpdateCommentDto,
  ): Promise<CommentResponse> {
    try {
      const result = await this.prisma.comment.update({
        where: {
          id,
        },
        data: dto,
        select,
      });
      return result;
    } catch (err) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
  }

  public async delete(id: string): Promise<CommentResponse> {
    try {
      const result = await this.prisma.comment.delete({ where: { id } });
      return result;
    } catch (err) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
  }
}
