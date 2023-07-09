<?php

namespace Jkli\Cms\Actions\CmsNode;

use Jkli\Cms\Http\Requests\CreateNodeRequest;
use Jkli\Cms\Models\CmsNode;

class CreateNodeAction
{

    public function __construct(
        protected CreateNodeRequest $req,
    ) {}

    /**
     * Creates a new CmsNode
     *
     * @return \Jkli\Cms\Models\CmsNode
     */
    public function handle()
    {
        if($this->req->input("insert") !== "outlet") {
            return $this->insert();
        }
        return $this->insertInOutlet();
    }
    
    /**
     * Creates a new CmsNode
     *
     * @return \Jkli\Cms\Models\CmsNode
     */
    public function insert() 
    {
        $refNode = CmsNode::findOrFail($this->req->input("ref_node")); // will be handled as sibling
        $index = $refNode->index;
        if($this->req->input("insert") === "after") {
            $index++;
        }

        CmsNode::where("parent_id", $refNode->parent_id)
            ->where("outlet", $refNode->outlet)
            ->where("index", ">=", $index)
            ->increment("index", 1);
        
        $node = new CmsNode();
        $node->parent_id = $refNode->parent_id;
        $node->outlet = $refNode->outlet;
        $node->index = $index;
        $node->type = $this->req->input("type");
        $node->settings = $this->req->input("settings");
        $node->save();

        return $node;
    }

    /**
     * Creates a new CmsNode
     *
     * @return \Jkli\Cms\Models\CmsNode
     */
    public function insertInOutlet() 
    {
        $parentNode = CmsNode::findOrFail($this->req->input("ref_node")); // will be handled as parent
        $outlet = $this->req->input("outlet", 0);
        $lastNode = CmsNode::where("parent_id", $parentNode->id)
            ->where("outlet", $outlet)
            ->orderBy("index", "desc")
            ->first();

        $node = new CmsNode();
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
