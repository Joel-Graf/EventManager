package com.cognyte.event_manager.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cognyte.event_manager.enums.EventStatus;
import com.cognyte.event_manager.exceptions.EntityValidationException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title must not be blank")
    @Column(nullable = false)
    private String title;

    @NotNull(message = "Start date must not be null")
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @NotNull(message = "End date must not be null")
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @PositiveOrZero(message = "Price must be greater than or equal to zero")
    @Column(nullable = false)
    private BigDecimal price;

    @NotNull(message = "Status must not be null")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status;

    @PrePersist
    @PreUpdate
    private void validateDatesAndPrice() {
        if (startDate.isAfter(endDate)) {
            throw new EntityValidationException("Start date must be before or equal to end date.");
        }
        if (price.compareTo(BigDecimal.ZERO) < 0) {
            throw new EntityValidationException("Price must be greater than or equal to zero.");
        }
    }
}
