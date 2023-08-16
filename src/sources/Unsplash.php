<?php

namespace kaitwalla\artwalla\sources;

use kaitwalla\artwalla\Art;
use kaitwalla\artwalla\dto\ArtCreateDTO;
use kaitwalla\artwalla\Source;

class Unsplash extends Source
{
    // Arts & Culture, wallpapers, nature, experimental
    public static $topicIds = ['bDo48cUhwnY', 'bo8jQKTaE0Y', '6sMVjTLSkeQ', 'qPYsDzvJOYc'];
    public static $sourceName = 'unsplash';

    public function __construct()
    {
        $this->getRawData();
        parent::__construct();
    }

    public function getRawData(): void
    {
        $this->rawData = json_decode(file_get_contents('https://api.unsplash.com/photos/random?topics=' . implode(',', self::$topicIds) . '&orientation=portrait&client_id=' . $_ENV['unsplashApiKey']));
    }

    protected function flattenTags(array $tags)
    {
        $string = '';
        foreach ($tags as $tag) {
            $string .= $tag->title . ',';
        }
        return $string;
    }

    protected function assignData(): void
    {
        if ($this->rawData) {
            $this->artData = new ArtCreateDTO(
                title: ($this->rawData->description) ? $this->rawData->description : '',
                category: $this->flattenTags($this->rawData->tags),
                description: $this->rawData->alt_description,
                artist: $this->rawData->user->name,
                url: $this->rawData->urls->full,
                source: self::$sourceName,
                sourceId: $this->rawData->id,
            );
        }
    }
}
