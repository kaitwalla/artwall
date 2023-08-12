<?php

namespace kaitwalla\artwall;

use kaitwalla\artwall\dto\ArtCreateDTO;
use kaitwalla\artwall\dto\ArtFromDTO;
use kaitwalla\artwall\dtos\ArtCreateDTO as DtosArtCreateDTO;

class ArtFactory
{
    public function __construct(Art $art)
    {
        if ($art->id) {
            return $this->update($art);
        } else {
            return $this->create(title: $art->title, description: $art->description, artist: $art->artist, source: $art->source, url: $art->url);
        }
    }

    public static function load(int $id): Art
    {
        $db = Database::loadArt($id);
        if ($db === null) {
            return null;
        }

        return new Art(...$db);
    }

    public static function loadRandomArt(): Art
    {
        $db = Database::loadRandomArt();
        if ($db === null) {
            return null;
        }

        return new Art(...$db);
    }

    public static function update(Art $art): Art
    {
        $art->id = Database::updateArt($art);
        return $art;
    }

    public static function create(
        string $title,
        string $description,
        string $artist,
        string $source,
        string $sourceId,
        string $url,
    ): Art {

        $createDTO = new ArtCreateDTO(
            title: $title,
            description: $description,
            artist: $artist,
            source: $source,
            sourceId: $sourceId,
            url: $url
        );
        $id = Database::createArt($createDTO);
        $art = ArtFromDTO::create(dto: $createDTO, id: $id);
        Storage::storeArt($art);
        return $art;
    }
}
