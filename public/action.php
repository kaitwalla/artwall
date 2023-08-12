<?php

use Dotenv\Dotenv;
use kaitwalla\artwalla\ArtFactory;
use kaitwalla\artwalla\SourceFactory;

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
            print json_encode(ArtFactory::load($response['id']));
            break;
        case 'randomArt':
            $art = ArtFactory::loadRandomArt();
            if ($art === null) {
                print json_encode(['error' => 'It broke']);
            } else {
                print json_encode($art);
            }
            break;
        case 'randomNewArt':
            print json_encode(SourceFactory::getNewArt());
            break;
        case 'favorite':
            if (isset($response['id'])) {
                ArtFactory::update($response['id'], ['favorited' => true]);
                print json_encode(['success']);
            } else {
                print json_encode(['error' => 'No ID provided']);
            }
    }
}
