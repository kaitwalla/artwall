<?php

namespace kaitwalla\artwall;

use kaitwalla\artwall\dto\ArtCreateDTO;

abstract class Source
{
    public static $sourceName;
    public object $rawData;
    public ArtCreateDTO $artData;
    public Art $art;

    public function __construct()
    {
        $this->getRawData();
        $this->assignData();
        $this->art = ArtFactory::create(
            new ArtCreateDTO(...(array)$this->artData)
        );
    }

    public static function createNewArt(): Art
    {
        $source = new static();
        return $source->art;
    }

    abstract protected function getRawData(): void;

    abstract protected function assignData(): void;
}
