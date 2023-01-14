<?php

namespace Jkli\Cms\Actions\Node;

use Jkli\Cms\Http\Requests\CreateNodeRequest;
use Jkli\Cms\Models\Node;

class CreateNodeAction
{

    public function __construct(
        protected CreateNodeRequest $req,
    ) {}

    /**
     * Creates a new Node
     *
     * @return \Jkli\Cms\Models\Node
     */
    public function handle()
    {
        if($this->req->input("insert") !== "outlet") {
            return $this->insert();
        }
        return $this->insertInOutlet();
    }
    
    /**
     * Creates a new Node
     *
     * @return \Jkli\Cms\Models\Node
     */
    public function insert() 
    {
        $refNode = Node::findOrFail($this->req->input("ref_node")); // will be handled as sibling
        $index = $refNode->index;
        if($this->req->input("insert") === "after") {
            $index++;
        }

        Node::where("parent_id", $refNode->parent_id)
            ->where("outlet", $refNode->outlet)
            ->where("index", ">=", $index)
            ->increment("index", 1);
        
        $node = new Node();
        $node->parent_id = $refNode->parent_id;
        $node->outlet = $refNode->outlet;
        $node->index = $index;
        $node->type = $this->req->input("type");
        $node->settings = $this->req->input("settings");
        $node->save();

        return $node;
    }

    /**
     * Creates a new Node
     *
     * @return \Jkli\Cms\Models\Node
     */
    public function insertInOutlet() 
    {
        $parentNode = Node::findOrFail($this->req->input("ref_node")); // will be handled as parent
        $outlet = $this->req->input("outlet", 0);
        $lastNode = Node::where("parent_id", $parentNode->id)
            ->where("outlet", $outlet)
            ->orderBy("index", "desc")
            ->first();

        $node = new Node();
        $node->parent_id = $parentNode->id;
        $node->outlet = $outlet;
        $node->index = 0;
        $node->type = $this->req->input("type");
        $node->settings = $this->req->input("settings");

        if($lastNode) {
            $node->index = $lastNode->index++;
        }

        $node->save();

        return $node;
    }
}
