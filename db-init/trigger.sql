CREATE OR REPLACE FUNCTION update_film_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the film's rating based on the average of all reviews for the film
    UPDATE films
    SET rating_film = (
        SELECT ROUND(AVG(rating_user), 1)
        FROM reviews
        WHERE film_id = NEW.film_id
    )
    WHERE film_id = NEW.film_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_film_rating
AFTER INSERT OR UPDATE OF status ON reviews
FOR EACH ROW
WHEN (NEW.status = 'accepted')
EXECUTE FUNCTION update_film_rating();