<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nodes', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('type');
            $table->integer('index')->nullable();
            $table->integer('outlet_index')->nullable();
            $table->json('data')->nullable();

            $table->timestamps();
        });
        Schema::table('nodes', function (Blueprint $table) {
            $table->foreignUuid('parent_id')->nullable()->references('id')->on('nodes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nodes');
    }
};
