export interface ISong {
  title?: String;
  description?: String;
  thumbnail?: String;
  artist_data?: {
    [key: string]: IArtist;
  };
  is_added_to_playlist?: Boolean
}

export interface IAlbum {
  title?: String;
  description?: String;
  thumbnail?: String;
  album_name?: String;
  artist_data?: {
    [key: string]: IArtist;
  };
}

export interface IArtist {
  id: Number;
  username: String;
  name: String;
  avatar: String;
  cover: String;
  active: String;
  admin: String;
  verified: String;
  last_active: String;
  registered: String;
  uploads: String;
  wallet: String;
  balance: String;
  artist: String;
}
