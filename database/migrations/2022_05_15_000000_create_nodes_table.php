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
        Schema::create('nodes', function (Blueprint $table) {

            $this->sharedColums($table);

            $table->softDeletes();
            $table->publishStatus();
        });
        Schema::table('nodes', function (Blueprint $table) {
            $table->foreignUuid('parent_id')
                ->nullable()
                ->references('id')
                ->on('nodes')
                ->onDelete('cascade');
        });

        Schema::create('published_nodes', function (Blueprint $table) {
            $this->sharedColums($table);
        });
        Schema::table('published_nodes', function (Blueprint $table) {
            $table->foreignUuid('parent_id')
                ->nullable()
                ->references('id')
                ->on('published_nodes')
                ->cascadeOnDelete();
        });
    }

    public function sharedColums(Blueprint $table)
    {
        $table->uuid('id')->primary();

        $table->string('type');
        $table->integer('index')->nullable();
        $table->integer('outlet')->default(0);
        $table->json('settings')->nullable();

        $table->timestamps();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nodes');
        Schema::dropIfExists('published_nodes');
    }
};
