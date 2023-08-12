<?php

namespace kaitwalla\artwalla;

use kaitwalla\artwalla\dto\ArtCreateDTO;

class Storage
{
    public static function storeArt(Art $art)
    {
        // Save file from url
        $file = file_get_contents($art->url);
        $filename = $art->id . '.jpg';
        $path = 'images/' . $filename;
        file_put_contents(__DIR__ . '/../public/' . $path, $file);
        $db = new Database();
    }
}
