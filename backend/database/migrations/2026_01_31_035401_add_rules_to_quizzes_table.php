<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            $table->unsignedInteger('max_attempts')->default(3);
            $table->unsignedInteger('pass_score')->default(70); // percent
        });
    }

    public function down()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropColumn(['max_attempts', 'pass_score']);
        });
    }
};