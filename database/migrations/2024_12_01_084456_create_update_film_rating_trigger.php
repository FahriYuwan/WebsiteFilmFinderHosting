<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUpdateFilmRatingTrigger extends Migration
{
    public function up()
    {
        // Membuat fungsi dan trigger
        DB::unprepared('
            CREATE OR REPLACE FUNCTION update_film_rating()
            RETURNS TRIGGER AS $$
            BEGIN
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
            WHEN (NEW.status = \'accepted\')
            EXECUTE FUNCTION update_film_rating();
        ');
    }

    public function down()
    {
        // Menghapus fungsi dan trigger
        DB::unprepared('
            DROP TRIGGER IF EXISTS trg_update_film_rating ON reviews;
            DROP FUNCTION IF EXISTS update_film_rating();
        ');
    }
}
