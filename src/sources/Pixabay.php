<?php

namespace kaitwalla\artwall\sources;

use kaitwalla\artwall\dto\ArtCreateDTO;
use kaitwalla\artwall\Source;

class Pixabay extends Source
{
    public static $sourceName = 'pixabay';
    public function __construct(object $rawData)
    {
        $this->rawData = $rawData;
        parent::__construct();
    }

    public function getRawData(): void
    {
    }

    protected function assignData(): void
    {
        $this->artData = new ArtCreateDTO(
            title: '',
            description: $this->rawData->tags,
            artist: $this->rawData->user,
            url: $this->rawData->largeImageURL,
            source: self::$sourceName,
            sourceId: $this->rawData->id
        );
    }
}
