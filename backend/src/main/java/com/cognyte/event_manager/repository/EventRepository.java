package com.cognyte.event_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognyte.event_manager.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

}
