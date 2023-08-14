<?php

namespace kaitwalla\artwalla;

use kaitwalla\artwalla\dto\ArtCreateDTO;
use kaitwalla\artwalla\dto\ArtPropertiesDTO;

class Database
{
    private $db;

    public function __construct()
    {
        // connect to sqlite
        $this->db = new \PDO('sqlite:../data/artwalla.db');
    }

    public static function loadArt(int $id)
    {
        $db = new self();
        $stmt = $db->db->prepare('SELECT * FROM art WHERE id = :id');
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_OBJ);
    }

    public static function loadRandomArt()
    {
        $db = new self();
        $stmt = $db->db->prepare('SELECT * FROM art ORDER BY RANDOM() LIMIT 1');
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public static function loadRandomFavoriteArt()
    {
        $db = new self();
        $stmt = $db->db->prepare('SELECT * FROM art WHERE favorited IS true ORDER BY RANDOM() LIMIT 1');
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public static function createArt(ArtCreateDTO $createDTO)
    {
        $db = new self();
        $stmt = $db->db->prepare('INSERT INTO art (title, description, url, artist, source, sourceId) VALUES (:title, :description, :url, :artist, :source, :sourceId)');
        $stmt->bindParam(':title', $createDTO->title, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $createDTO->description, \PDO::PARAM_STR);
        $stmt->bindParam(':url', $createDTO->url, \PDO::PARAM_STR);
        $stmt->bindParam(':artist', $createDTO->artist, \PDO::PARAM_STR);
        $stmt->bindParam(':source', $createDTO->source, \PDO::PARAM_STR);
        $stmt->bindParam(':sourceId', $createDTO->sourceId, \PDO::PARAM_STR);
        $stmt->execute();
        return $db->db->lastInsertId();
    }

    public static function updateArt(ArtPropertiesDTO $properties): bool
    {
        $db = new self();
        $sql = 'UPDATE art SET ';
        foreach (get_object_vars($properties) as $property => $value) {
            if ($property !== 'id' && $value !== null) {
                $sql .= $property . ' = ' . $value . ', ';
            }
        }
        $sql = substr($sql, 0, -2);
        $sql .= ' WHERE id = ' . $properties->id;
        $stmt = $db->db->prepare($sql);
        return $stmt->execute();
    }

    public static function sourceIdExists(string $source, string|int $sourceId)
    {
        $db = new self();
        $stmt = $db->db->prepare('SELECT COUNT(*) FROM art WHERE source = :source AND sourceId = :sourceId');
        $stmt->bindParam(':source', $source, \PDO::PARAM_STR);
        $stmt->bindParam(':sourceId', $sourceId, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    }
}
