<?php

namespace kaitwalla\artwall\dto;

use kaitwalla\artwall\Art;

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
            favorited: false,
            sourceId: $dto->sourceId,
        );
    }
}
