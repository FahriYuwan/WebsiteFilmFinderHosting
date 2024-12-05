<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    use HasFactory;
    protected $table = 'bookmarks';
    protected $primaryKey = 'bookmarks_id';
    protected $fillable = ['user_id', 'film_id'];
    public $incrementing = true;

    public function films()
    {
        return $this->belongsTo(Film::class, 'film_id', 'film_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
    
}