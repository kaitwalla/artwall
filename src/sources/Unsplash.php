<?php

namespace kaitwalla\artwall\sources;

use kaitwalla\artwall\Art;
use kaitwalla\artwall\dto\ArtCreateDTO;
use kaitwalla\artwall\Source;

class Unsplash extends Source
{
    public static $sourceName = 'unsplash';
    public function getRawData(): void
    {
        $this->rawData = json_decode(file_get_contents('https://api.unsplash.com/photos/random?orientation=portrait&client_id=' . $_ENV['unsplashApiKey']));
    }

    protected function assignData(): void
    {
        $this->artData = new ArtCreateDTO(
            title: ($this->rawData->description) ? $this->rawData->description : '',
            description: $this->rawData->alt_description,
            artist: $this->rawData->user->name,
            url: $this->rawData->urls->full,
            source: self::$sourceName,
            sourceId: $this->rawData->id,
        );
    }
}
