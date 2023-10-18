<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Jkli\Cms\Enums\PublishStatus;
use Jkli\Cms\Models\CmsNode;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shells', function (Blueprint $table) {

            $this->sharedColums($table);

            $table->softDeletes();
            $table->publishStatus();

            $table->foreignUuid('node_id')
                ->references('id')
                ->on('nodes')
                ->cascadeOnDelete();
        });

        Schema::create('published_shells', function (Blueprint $table) {
            
            $this->sharedColums($table);

            $table->foreignUuid('node_id')
                ->references('id')
                ->on('published_nodes')
                ->cascadeOnDelete();

        });
    }

    public function sharedColums(Blueprint $table)
    {
        $table->uuid('id')->primary();
        $table->string('name');

        $table->timestamps();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shells');
        Schema::dropIfExists('published_shells');
    }
};
