CREATE TABLE IF NOT EXISTS event (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    status VARCHAR(255) NOT NULL CHECK (status IN ('Started', 'Completed', 'Paused')),
    CONSTRAINT chk_dates CHECK (start_date <= end_date)
);

INSERT INTO event (title, start_date, end_date, price, status)
VALUES
-- Conferências e workshops
('AI & Machine Learning Summit', '2024-12-15 09:00:00', '2024-12-15 17:00:00', 200.00, 'Started'),
('Full-Stack Development Bootcamp', '2024-12-20 08:00:00', '2024-12-25 18:00:00', 500.00, 'Paused'),
('UX Design Workshop', '2024-11-10 10:00:00', '2024-11-10 16:00:00', 120.00, 'Completed'),
-- Shows e festivais
('Rock Festival 2024', '2025-01-05 15:00:00', '2025-01-06 02:00:00', 350.00, 'Paused'),
('Classical Music Evening', '2024-12-30 18:00:00', '2024-12-30 22:00:00', 80.00, 'Started'),
('Jazz Night Live', '2024-11-25 20:00:00', '2024-11-25 23:30:00', 100.00, 'Completed'),
-- Eventos esportivos
('City Marathon', '2025-03-10 06:00:00', '2025-03-10 12:00:00', 50.00, 'Started'),
('Indoor Cycling Championship', '2025-02-18 08:00:00', '2025-02-18 15:00:00', 75.00, 'Paused'),
('Yoga Retreat', '2025-01-12 07:00:00', '2025-01-14 18:00:00', 250.00, 'Completed'),
-- Feiras e exposições
('Tech Expo 2025', '2025-04-20 10:00:00', '2025-04-22 18:00:00', 300.00, 'Started'),
('Art Exhibition - Modern Classics', '2025-01-15 12:00:00', '2025-01-15 18:00:00', 45.00, 'Completed'),
('Startup Pitch Night', '2025-02-05 19:00:00', '2025-02-05 22:00:00', 60.00, 'Paused');
