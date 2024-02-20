<?php

namespace Database\Seeders;

use App\Http\Controllers\ForumsController;
use App\Models\Area;
use App\Models\Attack;
use App\Models\City;
use App\Models\Country;
use App\Models\Crime;
use App\Models\FightClub;
use App\Models\Forum;
use App\Models\ForumRank;
use App\Models\Honor;
use App\Models\Level;
use App\Models\Rank;
use App\Models\RealEstate;
use App\Models\Reward;
use App\Models\Role;
use App\Models\User;
use App\Models\UserCrime;
use App\Models\UserDetail;
use App\Models\UserStats;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
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

        $cityData = [
            [
                'name' => 'Demo City 1',
                'avatar' => null,
                'description' => null,
            ],
            [
                'name' => 'Demo City 2',
                'avatar' => null,
                'description' => null,
            ],
            [
                'name' => 'Demo City 3',
                'avatar' => null,
                'description' => null,
            ]
        ];
        $city = new City();
        $city->insert($cityData);

        $areaData = [
            [
                'name' => 'Demo Area 1',
                'avatar' => null,
                'description' => null,
            ],
            [
                'name' => 'Demo Area 2',
                'avatar' => null,
                'description' => null,
            ],
            [
                'name' => 'Demo Area 3',
                'avatar' => null,
                'description' => null,

            ]
        ];
        $area = new Area();
        $area->insert($areaData);

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

        $attacks = new Attack();
        $attacks->addAttackRecords($userStored->id);
    }
}
