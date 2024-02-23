import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { Event } from 'src/types/general';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    try {
      const event = await this.eventService.createEvent(createEventDto);
      return event;
    } catch (error) {
      throw new HttpException(
        'Failed to create event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<Event> {
    try {
      const event = await this.eventService.getEventById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    try {
      const updatedEvent = await this.eventService.updateEvent(
        id,
        updateEventDto,
      );
      return updatedEvent;
    } catch (error) {
      throw new HttpException(
        'Failed to update event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<void> {
    try {
      await this.eventService.deleteEvent(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllEvents(): Promise<Event[]> {
    try {
      const events = await this.eventService.getAllEvents();
      return events;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchEvents(@Query('keyword') keyword: string): Promise<Event[]> {
    try {
      const events = await this.eventService.searchEvents(keyword);
      return events;
    } catch (error) {
      throw new HttpException(
        'Failed to search events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
