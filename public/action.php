<?php

use Dotenv\Dotenv;
use kaitwalla\artwall\ArtFactory;
use kaitwalla\artwall\SourceFactory;

require_once(__DIR__ . '/../vendor/autoload.php');

// show all errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


$response = (!empty($_POST)) ? $_POST : $_GET;

if (isset($response['action'])) {
    switch ($response['action']) {
        case 'storedArt':
            if (empty($response['id'])) {
                echo json_encode(['error' => 'No ID provided']);
                exit;
            }
            echo json_encode(ArtFactory::load($response['id']));
            break;
        case 'newArt':
            return json_encode(SourceFactory::getNewArt());
            break;
    }
}
