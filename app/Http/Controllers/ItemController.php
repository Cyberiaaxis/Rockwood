<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\ItemSubCategory;
use App\Models\ItemAttribute;
use App\Models\ItemEffect;
use App\Models\ItemAttributeEffect;

/**
 * Class ItemController
 * @package App\Http\Controllers
 */
class ItemController extends Controller
{
    protected $item;
    protected $itemCategory;
    protected $itemSubCategory;
    protected $itemAttribute;
    protected $itemEffect;
    protected $itemAttributeEffect;
    

    /**
     * ItemController constructor.
     *
     * @param Item $item The Item model instance
     */
    public function __construct(
        Item $item,
        ItemCategory $itemCategory,
        ItemSubCategory $itemSubCategory,
        ItemAttribute $itemAttribute,
        ItemEffect $itemEffect,
        ItemAttributeEffect $itemAttributeEffect
    ) {
        $this->item = $item;
        $this->itemCategory = $itemCategory;
        $this->itemSubCategory = $itemSubCategory;
        $this->itemAttribute = $itemAttribute;
        $this->itemEffect = $itemEffect;
        $this->itemAttributeEffect = $itemAttributeEffect;
    }

    /**
     * Get a list of items.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getItemLists()
    {
        // Fetch items using the Item model
        return $this->item->getItems();
    }

    /**
     * Create a new item.
     *
     * @param Request $request The HTTP request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createItem(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Upload image if present and store path in database
        $imageUrl = $this->uploadImage($request);

        // Add image URL to validated data
        if ($imageUrl) {
            $validatedData['image_url'] = $imageUrl;
        }

        // Extract keys that are not needed for the item creation
        $keysToRemove = [
            'category_name',
            'subcategory_name',
            'attribute_name',
            'effect_name',
            'effect_value',
        ];
        $excludedData = array_diff_key($validatedData, array_flip($keysToRemove));

        // Create a new item record using the Item model
        $itemId = $this->item->addItem($excludedData); //Gun

        // Insert category, subcategory, attribute, and effect data if not already present
        $itemCategorylastInsertedId  = $this->itemCategory->addItemCategory([
            'category_name' => $validatedData['category_name'],
            'item_id' => $itemId
            ]); //weapon

        $itemSubCategorylastInsertedId = $this->itemSubCategory->addItemSubCategory([
            'subcategory_name' => $validatedData['subcategory_name'],
            'category_id' =>  $itemCategorylastInsertedId,
        ]); // ak 47

        $itemAttributelastInsertedId = $this->itemAttribute->addItemAttribute([
            'attribute_name' => $validatedData['attribute_name'],
            'subcategory_id' =>$itemSubCategorylastInsertedId
        ]); //Damage

        $itemEffectlastInsertedId = $this->itemEffect->addItemEffect([
            'effect_name' => $validatedData['effect_name'], //critical hit 
        ]);

        $this->itemAttributeEffect->addItemAttributeEffect([
            'attribute_id' => $itemAttributelastInsertedId,
            'effect_id' => $itemEffectlastInsertedId,
            'effect_value' => $validatedData['effect_value']
        ]);

        // Return a response indicating success
        return response()->json([
            'message' => 'Item created successfully',
            'item' => $validatedData,
        ], 201);
    }

    /**
     * Validate incoming request data and perform additional validation.
     *
     * @param Request $request The HTTP request
     * @return array
     */
    private function validateAndVerifyRequestData(Request $request): array
    {
        // Define validation rules
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_url' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'category_name' => ['required', 'string', 'max:255', 'unique:item_categories,category_name'],
            'subcategory_name' => ['required', 'string', 'max:255', 'unique:item_subcategories,subcategory_name'],
            'attribute_name' => ['required', 'string', 'max:255'],
            'effect_name' => ['required', 'string', 'max:255'],
            'effect_value' => ['required', 'string', 'max:255'],
        ];

        // Validate incoming request data
        return $request->validate($rules);
    }

    /**
     * Upload and store the item image.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
     * @return string|null
     */
    private function uploadImage(Request $request): ?string
    {
        if ($request->hasFile('image_url')) {
            $image = $request->file('image_url');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('itemImages', $filename);
            return "itemImages" . DIRECTORY_SEPARATOR . $filename;
        }

        return null;
    }
}
