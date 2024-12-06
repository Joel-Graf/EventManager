package com.cognyte.event_manager.enums;

public enum EventStatus {
    Started,
    Completed,
    Paused;

    public static EventStatus fromString(String status) {
        for (EventStatus statusEnum : EventStatus.values()) {
            if (statusEnum.name().equalsIgnoreCase(status)) {
                return statusEnum;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + status);
    }
}