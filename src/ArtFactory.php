<?php

namespace kaitwalla\artwalla;

use kaitwalla\artwalla\dto\ArtCreateDTO;
use kaitwalla\artwalla\dto\ArtFromDTO;
use kaitwalla\artwalla\dto\ArtPropertiesDTO;

class ArtFactory
{
    public function __construct(ArtCreateDTO|ArtPropertiesDTO $art)
    {
        if ($art->id) {
            return $this->update($art);
        } else {
            return $this->create($art);
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

    public static function loadFavorite(): Art
    {
        $db = Database::loadRandomFavoriteArt();
        if ($db === null) {
            return null;
        }

        return new Art(...$db);
    }

    public static function loadRandomArt(): Art | null
    {
        $db = Database::loadRandomArt();
        if ($db !== false) {
            return new Art(...$db);
        } else {
            return null;
        }
    }

    public static function update(ArtPropertiesDTO $props): bool
    {
        $art = Database::updateArt($props);
        return $art;
    }

    public static function create(
        ArtCreateDTO $createDTO
    ): Art {
        $id = Database::createArt($createDTO);
        $art = ArtFromDTO::create(dto: $createDTO, id: $id);
        Storage::storeArt($art);
        return $art;
    }
}
