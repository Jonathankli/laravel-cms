<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Jkli\Cms\Models\Node;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('published_pages', function (Blueprint $table) {
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

            $table->foreignUuid('node_id')
                ->references('id')
                ->on('published_nodes')
                ->cascadeOnDelete();

            $table->timestamps();
        });
        Schema::table('published_pages', function (Blueprint $table) {
            $table->foreignUuid('parent_id')
                ->nullable()
                ->references('id')
                ->on('published_pages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('published_pages');
    }
};
