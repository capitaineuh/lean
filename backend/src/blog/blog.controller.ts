import { Controller, Get, Post, Body, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll() {
    return this.blogService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Seul un administrateur peut ajouter un article.');
    }
    return this.blogService.create(createBlogDto);
  }
} 