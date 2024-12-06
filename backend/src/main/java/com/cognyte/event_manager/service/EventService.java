package com.cognyte.event_manager.service;

import java.util.List;
import java.util.Optional;

import com.cognyte.event_manager.dto.EventDTO;
import com.cognyte.event_manager.entity.Event;

public interface EventService {

    Event createEvent(Event event);

    List<Event> getAllEvents();

    Optional<Event> getEventById(Long id);

    Optional<Event> updateEvent(Long id, Event updatedEvent);

    boolean deleteEvent(Long id);

    EventDTO toDTO(Event event);

    Event toEntity(EventDTO eventDTO);

    List<EventDTO> toDTOList(List<Event> events);
}
