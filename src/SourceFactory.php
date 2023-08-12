<?php

namespace kaitwalla\artwall;

use kaitwalla\artwall\sources\Pixabay;
use kaitwalla\artwall\sources\Unsplash;

class SourceFactory
{
    public static function getNewArt($notPixabay = false)
    {
        //$randomNumber = ($notPixabay) ? rand(2, 3) : rand(1, 3);
        $randomNumber = ($notPixabay) ? 2 : 1;
        switch ($randomNumber) {
            case 1:
                $data = json_decode(file_get_contents('https://pixabay.com/api?editors_choice=true&order=latest&orientation=vertical&per_page=20&min_height=1200&key=' . $_ENV['pixaBayKey']));
                $additions = [];
                foreach ($data->hits as $item) {
                    if (!Database::sourceIdExists(Pixabay::$sourceName, $item->id)) {
                        array_push($additions, new Pixabay($item));
                    } else {
                        break;
                    }
                }
                if (count($additions) > 0) {
                    return $additions[0];
                } else {
                    return self::getNewArt(true);
                }
                break;
            case 2:
                return new Unsplash();
                break;
                /*case 3:
                return Pixabay::getNewArt();
                break;*/
        }
    }
}
