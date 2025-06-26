<?php

use Kreait\Firebase\Factory;

$firebase = (new Factory)
    ->withServiceAccount(storage_path('app/firebase/firebase_credentials.json'));

$auth = $firebase->createAuth();

