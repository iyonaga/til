<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite684a6791c29061ebdbd5dc8d60a73d8
{
    public static $files = array (
        'a0edc8309cc5e1d60e3047b5df6b7052' => __DIR__ . '/..' . '/guzzlehttp/psr7/src/functions_include.php',
        'c964ee0ededf28c96ebd9db5099ef910' => __DIR__ . '/..' . '/guzzlehttp/promises/src/functions_include.php',
        '37a3dc5111fe8f707ab4c132ef1dbc62' => __DIR__ . '/..' . '/guzzlehttp/guzzle/src/functions_include.php',
        '5255c38a0faeba867671b61dfda6d864' => __DIR__ . '/..' . '/paragonie/random_compat/lib/random.php',
        'decc78cc4436b1292c6c0d151b19445c' => __DIR__ . '/..' . '/phpseclib/phpseclib/phpseclib/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'p' => 
        array (
            'phpseclib\\' => 10,
        ),
        'R' => 
        array (
            'Ramsey\\Uuid\\' => 12,
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 8,
            'Psr\\Http\\Message\\' => 17,
            'Psr\\Cache\\' => 10,
        ),
        'M' => 
        array (
            'Monolog\\' => 8,
        ),
        'G' => 
        array (
            'GuzzleHttp\\Psr7\\' => 16,
            'GuzzleHttp\\Promise\\' => 19,
            'GuzzleHttp\\' => 11,
            'Google\\Cloud\\' => 13,
            'Google\\Auth\\' => 12,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
        'D' => 
        array (
            'Dotenv\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'phpseclib\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpseclib/phpseclib/phpseclib',
        ),
        'Ramsey\\Uuid\\' => 
        array (
            0 => __DIR__ . '/..' . '/ramsey/uuid/src',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'Psr\\Cache\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/cache/src',
        ),
        'Monolog\\' => 
        array (
            0 => __DIR__ . '/..' . '/monolog/monolog/src/Monolog',
        ),
        'GuzzleHttp\\Psr7\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/psr7/src',
        ),
        'GuzzleHttp\\Promise\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/promises/src',
        ),
        'GuzzleHttp\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/guzzle/src',
        ),
        'Google\\Cloud\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/cloud/src',
        ),
        'Google\\Auth\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/auth/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
        'Dotenv\\' => 
        array (
            0 => __DIR__ . '/..' . '/vlucas/phpdotenv/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'R' => 
        array (
            'Rize\\UriTemplate' => 
            array (
                0 => __DIR__ . '/..' . '/rize/uri-template/src',
            ),
        ),
        'G' => 
        array (
            'Google_Service_' => 
            array (
                0 => __DIR__ . '/..' . '/google/apiclient-services/src',
            ),
            'Google_' => 
            array (
                0 => __DIR__ . '/..' . '/google/apiclient/src',
            ),
        ),
    );

    public static $classMap = array (
        'Google_Service_Exception' => __DIR__ . '/..' . '/google/apiclient/src/Google/Service/Exception.php',
        'Google_Service_Resource' => __DIR__ . '/..' . '/google/apiclient/src/Google/Service/Resource.php',
        'OauthPhirehose' => __DIR__ . '/..' . '/fennb/phirehose/lib/OauthPhirehose.php',
        'Phirehose' => __DIR__ . '/..' . '/fennb/phirehose/lib/Phirehose.php',
        'PhirehoseConnectLimitExceeded' => __DIR__ . '/..' . '/fennb/phirehose/lib/Phirehose.php',
        'PhirehoseException' => __DIR__ . '/..' . '/fennb/phirehose/lib/Phirehose.php',
        'PhirehoseNetworkException' => __DIR__ . '/..' . '/fennb/phirehose/lib/Phirehose.php',
        'UserstreamPhirehose' => __DIR__ . '/..' . '/fennb/phirehose/lib/UserstreamPhirehose.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite684a6791c29061ebdbd5dc8d60a73d8::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite684a6791c29061ebdbd5dc8d60a73d8::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInite684a6791c29061ebdbd5dc8d60a73d8::$prefixesPsr0;
            $loader->classMap = ComposerStaticInite684a6791c29061ebdbd5dc8d60a73d8::$classMap;

        }, null, ClassLoader::class);
    }
}
