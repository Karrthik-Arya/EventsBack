import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }

  async getEventById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.getEventById(id);
    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: string): Promise<void> {
    const event = await this.getEventById(id);
    await this.eventRepository.delete(event);
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async searchEvents(keyword: string): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .where('event.title LIKE :keyword OR event.description LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .getMany();
  }
}
