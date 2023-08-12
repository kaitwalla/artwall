<?php

namespace kaitwalla\artwall\dto;

class ArtCreateDTO
{
    public function __construct(
        public string $title,
        public string $description,
        public string $artist,
        public string $source,
        public string $url,
        public string|int $sourceId,
    ) {
    }
}
