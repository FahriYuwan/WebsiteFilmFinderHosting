<?php
namespace App\Models;

use illuminate\Database\Eloquent\Model;

class Countries extends Model
{
    protected $table = 'countries';
    protected $primaryKey = 'countries_id';
    public $incrementing = true;

    protected $fillable = [
        'country_name'
    ];
    public function films()
    {
        return $this->hasMany(Film::class, 'countries_id', 'countries_id');
    }

    public function actors()
    {
        return $this->hasMany(Actor::class, 'country_id', 'countries_id');
    }
}