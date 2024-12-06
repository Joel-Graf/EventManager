package com.cognyte.event_manager.service.mapper;

import com.cognyte.event_manager.dto.EventDTO;
import com.cognyte.event_manager.entity.Event;
import com.cognyte.event_manager.enums.EventStatus;

public class EventMapper {
    public static EventDTO toDTO(Event event) {
        if (event == null) {
            return null;
        }
        return EventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .price(event.getPrice())
                .status(event.getStatus().name())
                .build();
    }

    public static Event toEntity(EventDTO eventDTO) {
        if (eventDTO == null) {
            return null;
        }
        Event event = new Event();
        event.setId(eventDTO.getId());
        event.setTitle(eventDTO.getTitle());
        event.setStartDate(eventDTO.getStartDate());
        event.setEndDate(eventDTO.getEndDate());
        event.setPrice(eventDTO.getPrice());
        event.setStatus(EventStatus.fromString(eventDTO.getStatus()));
        return event;
    }
}
