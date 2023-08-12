<?php

namespace kaitwalla\artwall\traits;

use kaitwalla\artwall\Art;

trait getNewArt
{
    public static function getNewArt(): Art
    {
        $self = new self();
        return $self->getArt();
    }
}
