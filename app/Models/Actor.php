<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;
    protected $table = 'actors';
    public $incrementing = true;
    protected $primaryKey = 'actor_id';
    protected $fillable = ['actor_name', 'url_actor', 'birthdate', 'countries_id'];

    public function films()
    {
        return $this->belongsToMany(Film::class, 'film_actor', 'actor_id', 'film_id');
    }

    public function countries()
    {
        return $this->belongsTo(Countries::class, 'countries_id', 'countries_id');
    }
    
}