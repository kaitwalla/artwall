<?php

namespace kaitwalla\artwalla\sources;

use kaitwalla\artwalla\dto\ArtCreateDTO;
use kaitwalla\artwalla\Source;

class Pexels extends Source
{
    public static $sourceName = 'pexels';
    public function __construct(object $rawData)
    {
        $this->rawData = $rawData;
        parent::__construct();
    }

    protected function assignData(): void
    {
        $this->artData = new ArtCreateDTO(
            title: '',
            category: '',
            description: $this->rawData->alt,
            artist: $this->rawData->photographer,
            url: $this->rawData->src->original,
            source: self::$sourceName,
            sourceId: $this->rawData->id
        );
    }
}
