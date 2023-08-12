<?php

namespace kaitwalla\artwall\sources;

use kaitwalla\artwall\Art;
use kaitwalla\artwall\Source;

class Unsplash extends Source
{
    public function getRawData(): void
    {
        $this->rawData = json_decode(file_get_contents('https://api.unsplash.com/photos/random?orientation=portrait&client_id=' . $_ENV['unsplashApiKey']));
    }

    protected function assignData(): void
    {
        $this->artData = new Art();
        $this->artData->title = $this->rawData->description || $this->rawData->alt_description;
        $this->artData->description = $this->rawData->alt_description;
        $this->artData->artist = $this->rawData->user->name;
        $this->artData->url = $this->rawData->urls->full;
        $this->artData->source = 'Unsplash';
    }
}
