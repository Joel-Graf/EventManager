package com.cognyte.event_manager.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognyte.event_manager.dto.EventDTO;
import com.cognyte.event_manager.entity.Event;
import com.cognyte.event_manager.repository.EventRepository;
import com.cognyte.event_manager.service.EventService;
import com.cognyte.event_manager.service.mapper.EventMapper;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    @Override
    public Optional<Event> updateEvent(Long id, Event updatedEvent) {
        Optional<Event> event = eventRepository.findById(id);
        event.ifPresent(e -> {
            e.setTitle(updatedEvent.getTitle());
            e.setStartDate(updatedEvent.getStartDate());
            e.setEndDate(updatedEvent.getEndDate());
            e.setPrice(updatedEvent.getPrice());
            e.setStatus(updatedEvent.getStatus());
            eventRepository.save(e);
        });
        return event;
    }

    @Override
    public boolean deleteEvent(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        event.ifPresent(eventRepository::delete);
        return event.isPresent();
    }

    // Método para converter Entity para DTO
    public EventDTO toDTO(Event event) {
        return EventMapper.toDTO(event);  // Utilizando o mapeamento
    }

    // Método para converter DTO para Entity
    public Event toEntity(EventDTO eventDTO) {
        return EventMapper.toEntity(eventDTO);  // Utilizando o mapeamento
    }

    // Método para converter uma lista de Event para uma lista de EventDTO
    public List<EventDTO> toDTOList(List<Event> events) {
        return events.stream()
                .map(EventMapper::toDTO)
                .collect(Collectors.toList());
    }
}
