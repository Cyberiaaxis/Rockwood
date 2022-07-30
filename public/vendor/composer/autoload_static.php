<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd909ffaaab217e484e3f9b63280da597
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Psr\\Container\\' => 14,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Psr\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/container/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'Pimple' => 
            array (
                0 => __DIR__ . '/..' . '/pimple/pimple/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd909ffaaab217e484e3f9b63280da597::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd909ffaaab217e484e3f9b63280da597::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitd909ffaaab217e484e3f9b63280da597::$prefixesPsr0;
            $loader->classMap = ComposerStaticInitd909ffaaab217e484e3f9b63280da597::$classMap;

        }, null, ClassLoader::class);
    }
}