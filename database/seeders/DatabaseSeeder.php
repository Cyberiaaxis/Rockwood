<?php

namespace Database\Seeders;

use Illuminate\Database\DatabaseManager;
use App\Http\Controllers\ForumsController;
use App\Models\Region;
use App\Models\Attack;
use App\Models\City;
use App\Models\Country;
use App\Models\Crime;
use App\Models\FightClub;
use App\Models\Forum;
use App\Models\ForumRank;
use App\Models\Gang;
use App\Models\Honor;
use App\Models\Level;
use App\Models\Rank;
use App\Models\RealEstate;
use App\Models\Reward;
use App\Models\Role;
use App\Models\TravelRoute;
use App\Models\User;
use App\Models\UserCrime;
use App\Models\UserDetail;
use App\Models\UserStats;
use App\Models\UserTravel;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    protected $db;

    /**
     * Create a new seeder instance.
     *
     * @param  \Illuminate\Database\DatabaseManager  $db
     * @return void
     */
    public function __construct(DatabaseManager $db)
    {
        $this->db = $db;
    }
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'name' => 'Rocky',
            'email' => 'admin@admin.com',
            'password' => Hash::make('Admin@1234'),
            'email_verified_at' => Carbon::now(),
        ];
        
        $user = new User();
        $userStored = $user->create($data);


        $role = new Role();
        $roleStored = $role->create(['name' => 'SuperAdministrator']);
        $userStored->assignRole($roleStored);

        $userStats = new UserStats();
        $userStats->addUserStats($userStored->id);

        $userDetails = new UserDetail();
        $userDetails->addUserDetails($userStored->id);

        $countryData = [
            [
                'name' => 'Demo Country 1',
                'avatar' => null,
                'description' => null,
            ],
            [
                'name' => 'Demo Country 2',
                'avatar' => null,
                'description' => null,
            ],
            [
                'name' => 'Demo Country 3',
                'avatar' => null,
                'description' => null,

            ]
        ];

        $country = new Country();
        $country->insert($countryData);
        $regionData = [
            [
                'name' => 'Demo Region 1',
                'avatar' => null,
                'description' => null,
                'country_id' => 1,
            ],
            [
                'name' => 'Demo Region 2',
                'avatar' => null,
                'description' => null,
                'country_id' => 2,
            ],
            [
                'name' => 'Demo Region 3',
                'avatar' => null,
                'description' => null,
                'country_id' => 3,

            ]
        ];
        $region = new Region();
        $region->insert($regionData);

        $cityData = [
            [
                'name' => 'Demo City 1',
                'avatar' => null,
                'description' => null,
                'region_id' => 1
            ],
            [
                'name' => 'Demo City 2',
                'avatar' => null,
                'description' => null,
                'region_id' => 2
            ],
            [
                'name' => 'Demo City 3',
                'avatar' => null,
                'description' => null,
                'region_id' => 3
            ]
        ];
        $city = new City();
        $city->insert($cityData);



        $forums = new Forum();
        $forums->insert([
            ['title' => 'Ganeral', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "General Discussions", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Gangs Discussions", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Community Events", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Achievements", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Gang Recrutment", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => "Suggestions", 'parent_id' => 1, 'is_cat' => 0],
            ['title' => 'Actions', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Attackings", 'parent_id' => 8, 'is_cat' => 0],
            ['title' => "Crimes", 'parent_id' => 8, 'is_cat' => 0],
            ['title' => "Missions", 'parent_id' => 8, 'is_cat' => 0],
            ['title' => 'Games', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Gambling", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => "Poker", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => "Russian Roulette", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => "Racing", 'parent_id' => 12, 'is_cat' => 0],
            ['title' => 'Art Work', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Graphics", 'parent_id' => 17, 'is_cat' => 0],
            ['title' => 'Guide', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Question & Answers", 'parent_id' => 19, 'is_cat' => 0],
            ['title' => "Tutorials & Guide", 'parent_id' => 19, 'is_cat' => 0],
            ['title' => "Finance", 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Banking", 'parent_id' => 23, 'is_cat' => 0],
            ['title' => "Stock Market", 'parent_id' => 23, 'is_cat' => 0],
            ['title' => "Trading Post", 'parent_id' => 23, 'is_cat' => 0],
            ['title' => 'Communication', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Discord", 'parent_id' => 26, 'is_cat' => 0],
            ['title' => 'Bug', 'parent_id' => null, 'is_cat' => 1],
            ['title' => "Bug & Issues", 'parent_id' => 28, 'is_cat' => 0],
        ]);

        $forumRankData = [
            'rankName' => '#noob',
            'rankDescription' => 'for a begun',
            'image' => null,
            'requirement' => null,
            'qty' => null
        ];
        $forumRank = new ForumRank();
        $forumRank->create($forumRankData);

        $fightClubData = [
            [
                'clubName' => 'Local Fighting Club',
                'bgimage' => null,
                'icon' => null,
                'area_id' => 1
            ],
            [
                'clubName' => 'Indian Fighting Club',
                'bgimage' => null,
                'icon' => null,
                'area_id' => 1
            ],
            [
                'clubName' => 'Paki Fighting Club',
                'bgimage' => null,
                'icon' => null,
                'area_id' => 1
            ]
        ];
        $fightClub = new FightClub();
        $fightClub->insert($fightClubData);

        $rankData = [
            'name' => 'demoRank',
        ];
        $rank = new Rank();
        $rank->create($rankData);

        $realEstateData = [
            'name' => 'demoHouse',
        ];

        $realEstate = new RealEstate();
        $realEstate->create($realEstateData);
        $honorData = [
            'name' => 'demoHonor',
        ];

        $honor =  new Honor();
        $honorStored = $honor->create($honorData);
        $userStored->honors()->attach($honorStored->id);
        $rewardData = [
            'name' => 'demoReward',
        ];

        $reward = new Reward();
        $rewardStored = $reward->create($rewardData);
        $userStored->rewards()->attach($rewardStored->id);

        $levelData = [
            'name' => 'demoLevel',
        ];

        $level = new Level();
        $rewardStored = $level->create($levelData);

        $crimeData = [
            'name' => 'demoCrime',
        ];

        $userCrime = new UserCrime();
        $userCrimeStored = $userCrime->addCrimeRecords($userStored->id);

        $routeData = [
            'from_country_id' => '1',
            'from_city_id' => '1',
            'from_region_id' => '1',
            'to_country_id' => '2',
            'to_city_id' => '2',
            'to_region_id' => '2',
            'cost' => '2',
            'status' => '1',
            'duration' => '30',
            'created_at' => now(),
            'updated_at' => now(),
        ];

        $travelRoutes = new TravelRoute();
        $travelRoutes->routeCreate($routeData);
        // $userTravel = new UserTravel();

        $attacks = new Attack();
        $attacks->addAttackRecords($userStored->id);

        $gangData = [
            [
            'name' => 'Demo Gang 1',
            'description' => 'description',
            'image' => 'image',
            'created_at' =>  now(),
            'updated_at' => now(), 
        ],[
            'name' => 'Demo Gang 2',
            'description' => 'description',
                'image' => 'image',
            'created_at' =>  now(),
            'updated_at' => now(),
        ], [
            'name' => 'Demo Gang 3',
                'description' => 'description',
                'image' => 'image',
            'created_at' =>  now(),
            'updated_at' => now(),
        ], [
            'name' => 'Demo Gang 4',
                'description' => 'description',
                'image' => 'image',
            'created_at' =>  now(),
            'updated_at' => now(),
        ], [
            'name' => 'Demo Gang 5',
                'description' => 'description',
                'image' => 'image',
            'created_at' =>  now(),
            'updated_at' => now(),
        ],[
                'name' => 'Demo Gang 6',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 7',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 8',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 9',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 10',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ],            [
                'name' => 'Demo Gang 11',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 12',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 13',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 14',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ], [
                'name' => 'Demo Gang 15',
                'description' => 'description',
                'image' => 'image',
                'created_at' =>  now(),
                'updated_at' => now(),
            ],
    ];
        $gang = new Gang();
        $gang->insert($gangData);

    }
}
