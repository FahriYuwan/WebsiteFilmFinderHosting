import psycopg2
import json
import os

# Sesuaikan dengan host masing-masing
db = psycopg2.connect(
    host="junction.proxy.rlwy.net", # Jika tidak menggunakan docker (sebelumnya "db"), maka isi dengan localhost
    user="postgres",
    password="esRcoXOnlnEuPtPsgKiQVvezYreUFzQk",
    database="railway",
    port = 59704
)

cursor = db.cursor()

def load_json_data(file_name):
    file_path = os.path.join(os.getcwd(), file_name)
    with open(file_path, 'r') as file:
        return json.load(file)


# Sesuaikan dengan path file masing-masing, gunakan path ini jika ingin menggunakan docker "database/python_seeders/result_cleanse/"

countries_data = load_json_data('database/python_seeders/result_cleanse/countries.json')
award_data = load_json_data('database/python_seeders/result_cleanse/awards.json')
genres_data = load_json_data('database/python_seeders/result_cleanse/genres.json')
actor_data = load_json_data('database/python_seeders/result_cleanse/actors.json')
movie_data = load_json_data('database/python_seeders/result_cleanse/films.json')
movie_actor_data = load_json_data('database/python_seeders/result_cleanse/film_actor.json')
movie_award_data = load_json_data('database/python_seeders/result_cleanse/film_award.json')
movie_genre_data = load_json_data('database/python_seeders/result_cleanse/film_genre.json')

for country in countries_data:
    print(country['country_name'])
    cursor.execute("""
        INSERT INTO countries (countries_id, country_name, created_at, updated_at)
        VALUES (%s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (country['countries_id'], country['country_name']))
    
for award in award_data:
    print(award['award_name'])
    cursor.execute("""
        INSERT INTO awards (award_id, award_name, year, created_at, updated_at)
        VALUES (%s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (award['award_id'], award['award_name'], award['year']))

for genre in genres_data:
    print(genre['genre_name'])
    cursor.execute("""
        INSERT INTO genres (genre_id, genre_name, created_at, updated_at)
        VALUES (%s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (genre['genre_id'], genre['genre_name']))

for actor in actor_data:
    print(actor['actor_name'])
    picture = actor['url_actor'] if actor['url_actor'] else ""
    cursor.execute("""
        INSERT INTO actors (actor_id, countries_id, actor_name, url_actor, birthdate, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (actor['actor_id'], actor['countries_id'], actor['actor_name'], picture, actor['birthdate']))
    
for movie in movie_data:
    print(movie['title'])
    cursor.execute("""
        INSERT INTO films (film_id, countries_id, url_banner, title, alternative_title, year_release, synopsis, availability, views, url_trailer, rating_film, status, duration, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (movie['film_id'], movie['countries_id'], movie['url_banner'], movie['title'], movie['alternative_title'], movie['year_release'], movie['synopsis'], movie['availability'], movie['views'], movie['url_trailer'], movie['rating_film'], movie['status'], movie['duration']))

for movie_actor in movie_actor_data:
    print(movie_actor['film_id'])
    cursor.execute("""
        INSERT INTO film_actor (film_id, actor_id, created_at, updated_at)
        VALUES (%s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (movie_actor['film_id'], movie_actor['actor_id']))
    
for movie_award in movie_award_data:
    print(movie_award['film_id'])
    cursor.execute("""
        INSERT INTO film_award (film_id, award_id, created_at, updated_at)
        VALUES (%s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (movie_award['film_id'], movie_award['award_id']))
    
for movie_genre in movie_genre_data:
    print(movie_genre['film_id'])
    cursor.execute("""
        INSERT INTO film_genre (film_id, genre_id, created_at, updated_at)
        VALUES (%s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    """, (movie_genre['film_id'], movie_genre['genre_id']))

db.commit()

cursor.close()
db.close()