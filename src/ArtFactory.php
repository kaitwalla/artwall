<?php

namespace kaitwalla\artwall;

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

        $art = new Art();
        $art->id = $db['id'];
        $art->title = $db['title'];
        $art->description = $db['description'];
        $art->artist = $db['artist'];
        $art->source = $db['source'];
        $art->url = $db['url'];
        $art->favorited = $db['favorited'];
        return $art;
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
        string $url,
    ): Art {
        $art = new Art();
        $art->title = $title;
        $art->description = $description;
        $art->artist = $artist;
        $art->source = $source;
        $art->favorited = 0;
        $art->url = $url;
        $art->id = Database::createArt($art);
        Storage::storeArt($art);
        return $art;
    }
}
