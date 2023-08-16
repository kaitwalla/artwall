<?php

use Dotenv\Dotenv;
use kaitwalla\artwalla\dto\ArtPropertiesDTO;
use kaitwalla\artwalla\ArtFactory;
use kaitwalla\artwalla\Database;
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
        case 'deleteArt':
            if (empty($response['id'])) {
                echo json_encode(['error' => 'No ID provided']);
                exit;
            }
            if (ArtFactory::delete($response['id'])) {
                echo json_encode(['success']);
            } else {
                echo json_encode(['error' => 'It broke']);
            }
            break;
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
        case 'favorites':
            print json_encode(ArtFactory::loadFavorite());
            break;
        case 'randomNewArt':
            print json_encode(SourceFactory::getNewArt());
            break;
        case 'favorite':
            if (isset($response['id'])) {
                if (ArtFactory::update(new ArtPropertiesDTO(id: intVal($response['id']), favorited: true))) {
                    print json_encode(['success']);
                } else {
                    print json_encode(['error' => 'It broke']);
                }
            } else {
                print json_encode(['error' => 'No ID provided']);
            }
            break;
        case 'video':
            $files = glob(__DIR__ . '/../public/videos/*.*');
            $file = array_rand($files);
            print json_encode(['video' => basename($files[$file])]);
            break;
    }
}
