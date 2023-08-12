<?php

namespace kaitwalla\artwalla;

class Art
{
    public function __construct(
        public string $title,
        public string $description,
        public string $artist,
        public string $source,
        public string $url,
        public string $category,
        public bool $favorited,
        public bool $disliked,
        public string|int $sourceId,
        public int $id
    ) {
    }
}
