<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // IMPORTANT: use wildcard for Codespaces
    'allowed_origins' => [
        '*',
    ],

    'allowed_origins_patterns' => [
        '/^https:\/\/.*\.app\.github\.dev$/',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];