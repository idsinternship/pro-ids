<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            if (Schema::hasColumn('quizzes', 'pass_score')) {
                $table->dropColumn('pass_score');
            }
        });
    }

    public function down()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            $table->integer('pass_score')->nullable();
        });
    }
};