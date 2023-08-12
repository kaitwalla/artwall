<?php

namespace kaitwalla\artwall;

class Database
{
    private $db;

    public function __construct()
    {
        // connect to sqlite
        $this->db = new \PDO('sqlite:../data/artwall.db');
    }

    public static function loadArt(int $id)
    {
        $db = new self();
        $stmt = $db->db->prepare('SELECT * FROM art WHERE id = :id');
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_OBJ);
    }

    public static function createArt(Art $art)
    {
        $db = new self();
        $stmt = $db->db->prepare('INSERT INTO art (title, description, url, artist, source) VALUES (:title, :description, :url, :artist, :source)');
        $stmt->bindParam(':title', $art->title, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $art->description, \PDO::PARAM_STR);
        $stmt->bindParam(':url', $art->url, \PDO::PARAM_STR);
        $stmt->bindParam(':artist', $art->artist, \PDO::PARAM_STR);
        $stmt->bindParam(':source', $art->source, \PDO::PARAM_STR);
        $stmt->execute();
        return $db->db->lastInsertId();
    }

    public static function updateArt(Art $art)
    {
        $db = new self();
        $stmt = $db->db->prepare('UPDATE art SET title = :title, description = :description, url = :url, artist = :artist, source = :source WHERE id = :id');
        $stmt->bindParam(':title', $art->title, \PDO::PARAM_STR);
        $stmt->bindParam(':description', $art->description, \PDO::PARAM_STR);
        $stmt->bindParam(':url', $art->url, \PDO::PARAM_STR);
        $stmt->bindParam(':artist', $art->artist, \PDO::PARAM_STR);
        $stmt->bindParam(':source', $art->source, \PDO::PARAM_STR);
        $stmt->bindParam(':id', $art->id, \PDO::PARAM_INT);
        $stmt->execute();
    }
}
