<?php

namespace kaitwalla\artwall;

abstract class Source
{
    public object $rawData;
    public Art $artData;

    public function __construct()
    {
        $this->getRawData();
        $this->assignData();
        return ArtFactory::create(
            title: $this->artData->title,
            artist: $this->artData->artist,
            url: $this->artData->url,
            source: $this->artData->source,
            description: $this->artData->description
        );
    }

    abstract protected function getRawData(): void;

    abstract protected function assignData(): void;
}
