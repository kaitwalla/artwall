<?php

namespace kaitwalla\artwall;

use kaitwalla\artwall\dto\ArtCreateDTO;

abstract class Source
{
    public static $sourceName;
    public object $rawData;
    public ArtCreateDTO $artData;

    public function __construct()
    {
        $this->getRawData();
        $this->assignData();
        return ArtFactory::create(
            ...(array)$this->artData
        );
    }

    abstract protected function getRawData(): void;

    abstract protected function assignData(): void;
}
