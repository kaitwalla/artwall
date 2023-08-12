<?php

namespace kaitwalla\artwall\sources;

use kaitwalla\artwall\dto\ArtCreateDTO;
use kaitwalla\artwall\Source;

class Pexels extends Source
{
    public static $sourceName = 'pexels';
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
            description: $this->rawData->alt,
            artist: $this->rawData->photographer,
            url: $this->rawData->src->original,
            source: self::$sourceName,
            sourceId: $this->rawData->id
        );
    }
}
