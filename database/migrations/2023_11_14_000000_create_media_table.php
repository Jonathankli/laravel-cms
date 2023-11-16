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
        Schema::create('media', function (Blueprint $table) {

            $this->sharedColums($table);

            $table->unsignedInteger('order')->default(0);

            $table->softDeletes();
            $table->publishStatus();

            $table->foreignUuid('folder_id')
                ->nullable()
                ->references('id')
                ->on('folders');

        });

        Schema::create('published_media', function (Blueprint $table) {
            
            $this->sharedColums($table);

        });

    }

    public function sharedColums(Blueprint $table)
    {
        $table->uuid('id')->primary();
        $table->string('name');
        $table->string('file_name');
        $table->string('mime_type');

        //SEO
        $table->string('title')->nullable();
        $table->string('alt')->nullable();
        $table->string('copy')->nullable();
        $table->string('description')->nullable();

        $table->boolean('is_active')->default(true);

        $table->timestamps();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('published_media');
    }
};
