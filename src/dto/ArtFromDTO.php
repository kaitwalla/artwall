<?php

namespace kaitwalla\artwalla\dto;

use kaitwalla\artwalla\Art;

class ArtFromDTO
{
    public static function create(ArtCreateDTO $dto, int $id): Art
    {
        return new Art(
            id: $id,
            title: $dto->title,
            description: $dto->description,
            url: $dto->url,
            artist: $dto->artist,
            source: $dto->source,
            category: $dto->category,
            favorited: false,
            disliked: false,
            sourceId: $dto->sourceId,
        );
    }
}
