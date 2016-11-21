-- Database name
-- TREATS
-- Document your create tables SQL here
CREATE TABLE treats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  description TEXT(2000),
  pic TEXT(2000)
);

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
