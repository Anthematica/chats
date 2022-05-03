<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    function user() {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    function sender() {
        return $this->belongsTo(User::class, 'sender_id');
    }

    protected $guarded = [];
}
