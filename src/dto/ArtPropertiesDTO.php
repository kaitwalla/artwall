<?php

class ArtPropertiesDTO
{
    public function __construct(
        public int $id,
        public string|null $title = null,
        public string|null $description = null,
        public string|null $artist = null,
        public string|null $source = null,
        public string|null $url = null,
        public string|null $category = null,
        public string|null|int $sourceId = null,
        public bool|null $favorited = null,
        public bool|null $disliked = null
    ) {
    }
}
