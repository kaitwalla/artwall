CREATE TABLE "art" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(200) NOT NULL,
    source VARCHAR(200) NOT NULL,
    url VARCHAR(200) NOT NULL,
    favorited BOOLEAN NOT NULL DEFAULT(0),
    description VARCHAR(200),
    sourceId VARCHAR(200) NOT NULL,
    disliked BOOLEAN NOT NULL DEFAULT(0),
    category VARCHAR(200) NOT NULL default('')
);
