<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\ItemCategory; 
use App\Models\ItemSubcategorie; 
use App\Models\ItemAttribute;
use App\Models\ItemEffect;
/**
 * Class ItemController
 * @package App\Http\Controllers
 */
class ItemController extends Controller
{
    /**
     * @var Item The Item model instance
     */
    protected $item;

    /**
     * @var ItemCategory The Item model instance
     */
    protected $itemCategory;

    /**
    * @var ItemSubcategorie The Item model instance
    */
    protected $itemSubcategorie;

    /**
    * @var ItemAttribute The Item model instance
    */
    protected $itemAttribute;

    /**
    * @var ItemEffect The Item model instance
    */
    protected $itemEffect;
    
    

    /**
     * ItemController constructor.
     *
     * @param Item $item The Item model instance
     */
    public function __construct(
            Item $item, 
            ItemCategory $itemCategory, 
            ItemSubcategorie $itemSubcategorie,
            ItemAttribute $itemAttribute,
            ItemEffect $itemEffect
        )
    {
        $this->item = $item;
        $this->itemCategory = $itemCategory;
        $this->itemSubcategorie = $itemSubcategorie;
        $this->itemAttribute = $itemAttribute;
        $this->itemEffect = $itemEffect;
    }

    public function getItemLists()
    {
        
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
            // Keys to remove
            $keysToRemove = [
                'category_name' => $validatedData['category_name'], 
                'subcategory_name' => $validatedData['subcategory_name'],
                'attribute_name'  => $validatedData['attribute_name'],
                'effect_name' => $validatedData['effect_name'],
                'effect_value' => $validatedData['effect_value']
            ];

        //  $categoryName = ['category_name' => $validatedData['category_name']];
        //  $subcategoryName = ['subcategory_name' => $validatedData['subcategory_name']];
        //  $array = json_decode($categoryName, true);
        $exculded = array_diff_key($validatedData, $keysToRemove);
        // Create a new item record
        // return $categoryName['category_name'];
        $itemInsertedId = $this->item->addItem($exculded);
        $itemCategoryInsertedId = $this->itemCategory->addItemCategory(
            [
                'category_name' => $keysToRemove['category_name']
            ]
        );
        
        $itemSubcategorieInsertedId = $this->itemSubcategorie->addItemSubcategorie(
            [
                 'subcategory_name' => $keysToRemove['subcategory_name'],
                 'category_id' => $itemCategoryInsertedId
            ]
        );

        $itemAttributeInsertedId = $this->itemAttribute->addItemAttribute(
            [
                 'attribute_name' => $keysToRemove['attribute_name'],
            ]
        );

        $ItemEffectInsertedId = $this->itemEffect->addItemEffect(
            [
                 'effect_name' => $keysToRemove['effect_name'],
                 'effect_value' => $keysToRemove['effect_value']
            ]
        );
        // Return a response indicating success
        return response()->json([
            'message' => 'Item with name ' . $validatedData['name'] . ' created successfully',
            'item' => $validatedData
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
            'category_name' => ['required', 'string', 'max:255'],
            'subcategory_name' => ['required', 'string', 'max:255'],
            'attribute_name' => ['required', 'string', 'max:255'],
            'effect_name' => ['required', 'string', 'max:255'],
            'effect_value' => ['required', 'string', 'max:255']
        ];
                // Check if the request has 'id' field, add validation rule if present
        if ($request->has('id')) 
        {
            $rules['id'] = ['nullable', 'integer', 'exists:items'];
        }

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

    /**
     * Update an existing item.
     *
     * @param  \Illuminate\Http\Request  $request The HTTP request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateItem(Request $request)
    {
        // Validate incoming request data and perform unique validation
        $validatedData = $this->validateAndVerifyRequestData($request);

        // Upload image if present and store path in database
        $imageUrl = $this->uploadImage($request);

        // Separate 'id' from other validated data
        $id = ['id' => $validatedData['id']];
        $remainingData = array_diff_key($validatedData, $id);

        // If an image was uploaded, include its URL in the data to be stored or updated
        if ($imageUrl) {
            $remainingData['image_url'] = $imageUrl;
        }

        // Modify the item using 'id' and other data
        return $this->item->modifyItem($id['id'], $remainingData);
    }
}
