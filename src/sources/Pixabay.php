<?php

namespace kaitwalla\artwalla\sources;

use kaitwalla\artwalla\dto\ArtCreateDTO;
use kaitwalla\artwalla\Source;

class Pixabay extends Source
{
    public static $sourceName = 'pixabay';
    public function __construct(object $rawData)
    {
        $this->rawData = $rawData;
        parent::__construct();
    }

    protected function assignData(): void
    {
        $this->artData = new ArtCreateDTO(
            title: '',
            category: $this->rawData->tags,
            description: $this->rawData->tags,
            artist: $this->rawData->user,
            url: $this->rawData->largeImageURL,
            source: self::$sourceName,
            sourceId: $this->rawData->id
        );
    }
}
