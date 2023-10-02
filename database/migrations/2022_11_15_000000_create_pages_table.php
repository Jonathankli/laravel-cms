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
        Schema::create('pages', function (Blueprint $table) {

            $this->sharedColums($table);

            $table->publishStatus();

            $table->foreignUuid('shell_id')
                ->nullable()
                ->references('id')
                ->on('shells');

            $table->foreignUuid('node_id')
                ->references('id')
                ->on('nodes')
                ->onDelete('cascade');

        });
        Schema::table('pages', function (Blueprint $table) {
            $table->foreignUuid('parent_id')
                ->nullable()
                ->references('id')
                ->on('pages');
        });

        Schema::create('published_pages', function (Blueprint $table) {
            
            $this->sharedColums($table);

            $table->foreignUuid('shell_id')
                ->nullable()
                ->references('id')
                ->on('published_shells');

            $table->foreignUuid('node_id')
                ->references('id')
                ->on('published_nodes')
                ->cascadeOnDelete();
        });
        Schema::table('published_pages', function (Blueprint $table) {
            $table->foreignUuid('parent_id')
                ->nullable()
                ->references('id')
                ->on('published_pages');
        });
    }

    public function sharedColums(Blueprint $table)
    {
        $table->uuid('id')->primary();
        $table->string('path');
        $table->string('full_path');
        $table->string('name');

        //SEO
        $table->string('title');
        $table->string('description')->nullable();
        $table->boolean('no_index')->default(false);
        $table->boolean('no_follow')->default(false);

        $table->boolean('is_active')->default(true);
        $table->boolean('use_parent_path')->default(true);

        $table->timestamps();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
        Schema::dropIfExists('published_pages');
    }
};
