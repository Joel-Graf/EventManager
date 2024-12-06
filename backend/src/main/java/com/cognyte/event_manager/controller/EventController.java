package com.cognyte.event_manager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognyte.event_manager.dto.EventDTO;
import com.cognyte.event_manager.entity.Event;
import com.cognyte.event_manager.exceptions.InternalServerErrorException;
import com.cognyte.event_manager.exceptions.NotFoundException;
import com.cognyte.event_manager.service.EventService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // URL do frontend
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        try {
            Event event = eventService.toEntity(eventDTO);
            Event savedEvent = eventService.createEvent(event);
            EventDTO savedEventDTO = eventService.toDTO(savedEvent);
            return new ResponseEntity<>(savedEventDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while creating the event: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        try {
            List<Event> events = eventService.getAllEvents();
            List<EventDTO> eventDTOs = eventService.toDTOList(events);
            return new ResponseEntity<>(eventDTOs, HttpStatus.OK);
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while fetching all events: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        try {
            Optional<Event> event = eventService.getEventById(id);
            if (event.isEmpty()) {
                throw new NotFoundException("Event not found with id: " + id);
            }
            return ResponseEntity.ok(eventService.toDTO(event.get()));
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while fetching the event: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @Valid @RequestBody EventDTO eventDTO) {
        try {
            Event event = eventService.toEntity(eventDTO);
            Optional<Event> updatedEvent = eventService.updateEvent(id, event);
            if (updatedEvent.isEmpty()) {
                throw new NotFoundException("Event not found with id: " + id);
            }
            return ResponseEntity.ok(eventService.toDTO(updatedEvent.get()));
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while updating the event: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            boolean isDeleted = eventService.deleteEvent(id);
            if (!isDeleted) {
                throw new NotFoundException("Event not found with id: " + id);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while deleting the event: " + e.getMessage());
        }
    }
}
