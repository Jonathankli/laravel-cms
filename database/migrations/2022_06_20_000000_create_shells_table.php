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
            $table->uuid('id')->primary();
            $table->string('name');

            $table->enum('publish_status', collect(PublishStatus::cases())->pluck('value')->toArray())->default(PublishStatus::Draft->value);

            $table->foreignUuid('node_id')
                ->references('id')
                ->on('nodes')
                ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shells');
    }
};
