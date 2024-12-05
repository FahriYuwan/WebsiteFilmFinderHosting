<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;
    protected $table = 'awards';
    public $incrementing = true;
    protected $primaryKey = 'award_id';
    protected $fillable = ['award_name', 'year'];

    public function films()
    {
        return $this->belongsToMany(Film::class, 'film_award', 'award_id', 'film_id');
    }
    
}
