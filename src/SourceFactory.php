<?php

namespace kaitwalla\artwall;

use kaitwalla\artwall\sources\Unsplash;

class SourceFactory
{
    public static function getNewArt()
    {
        //$randomNumber = rand(1, 3);
        $randomNumber = 1;
        switch ($randomNumber) {
            case 1:
                return new Unsplash();
                break;
                /*case 2:
                return Pexels::getNewArt();
                break;
            case 3:
                return Pixabay::getNewArt();
                break;*/
        }
    }
}
