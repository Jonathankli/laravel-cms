<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Jkli\Cms\Enums\PublishStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('folders', function (Blueprint $table) {

            $table->uuid('id')->primary();
            $table->string('name');
    
            $table->boolean('is_active')->default(true);
    
            $table->timestamps();

        });

        Schema::table('folders', function (Blueprint $table) {

            $table->foreignUuid('parent_id')
                ->nullable()
                ->references('id')
                ->on('folders');

        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('folders');
    }
};
