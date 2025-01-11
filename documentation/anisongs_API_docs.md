# Anisongs Music App

## Database Schema Design

![db-schema]

[db-schema]: ./db_schema/anisongs_db.png
[airbnb-db-diagram-info]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/airbnb-db-diagram-info.txt

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* **Request**: endpoints that require authentication
* **Error Response**: Require authentication
  * **Status Code**: `401`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Authentication required"
  }
  ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* **Request**: Endpoints that require proper authorization
* **Error Response**: Requires proper authorization
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Forbidden"
  }
  ```

### Get the Current User

Returns the information about the current user that is logged in.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/session`
  * **Body**: `none`

* **Successful Response** when there is a logged in user
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "user": {
      "id": 1,
      "firstName": "Gugu",
      "lastName": "Mbatha-Raw",
      "email": "gugu.gaga@app.io",
      "username": "GuguGaga"
    }
  }
  ```

* **Successful Response** when there is no logged in user
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "user": null
  }
  ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* **Require Authentication**: false
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/session`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "credential": "gugu.gaga@app.io",
    "password": "password1"
  }
  ```

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "user": {
      "id": 1,
      "firstName": "Gugu",
      "lastName": "Mbatha-Raw",
      "email": "gugu.gaga@app.io",
      "username": "GuguGaga"
    }
  }
  ```

* **Error Response**: Invalid credentials
  * **Status Code**: `401`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Invalid login credentials"
  }
  ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "credential": "Email or username is required",
      "password": "Password is required"
    }
  }
  ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* **Require Authentication**: false
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/users`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "firstName": "Gugu",
    "lastName": "Mbatha-Raw",
    "email": "gugu.gaga@app.io",
    "username": "GuguGaga",
    "password": "password1"
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "user": {
      "id": 1,
      "firstName": "Gugu",
      "lastName": "Mbatha-Raw",
      "email": "gugu.gaga@app.io",
      "username": "GuguGaga"
    }
  }
    ```

* **Error Response**: User already exists with the specified email or username
  * **Status Code**: `500`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "User already exists",
    "errors": {
      "email": "User with that email already exists",
      "username": "User with that username already exists"
    }
  }
  ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "email": "Invalid email",
      "username": "Username is required",
      "firstName": "First Name is required",
      "lastName": "Last Name is required"
    }
  }
  ```

## SONGS

### Get all Songs

Returns all the songs.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Songs": [
      {
        "id": 1,
        "ownerId": 1,
        "title": "Fukai Mori",
        "artist": "Do As Infinity",
        "file": "song1 url",
        "songImg": "song img url",
        "anime": "InuYasha","albumName": "Deep Forest",
        "albumArt": "album art url",
        "year": 2001,
        "length": "3:04",
        "liked": true,
        "lastPlayed": "2022-01-09 00:25:13",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```

### Get all Songs uploaded by the Current User

Returns all the songs owned (uploaded) by the current user.

* **Require Authentication**: true
* **Require Authorization**: Songs must be uploaded by user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs/current`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Songs": [
      {
        "id": 1,
        "ownerId": 1,
        "title": "Fukai Mori",
        "artist": "Do As Infinity",
        "file": "song1 url",
        "songImg": "song img url",
        "anime": "InuYasha","albumName": "Deep Forest",
        "albumArt": "album art url",
        "year": 2001,
        "length": "3:04",
        "liked": true,
        "lastPlayed": "2022-01-09 00:25:13",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```
* **Error Response**: Couldn't find any songs uploaded by current user
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No uploaded songs found"
  }
  ```

### Get details of a Song from an Id

Returns the details of a song specified by its id.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs/:songId`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "ownerId": 1,
    "title": "Fukai Mori",
    "artist": "Do As Infinity",
    "file": "song1 url",
    "songImg": "song img url",
    "anime": "InuYasha",
    "albumName": "Deep Forest",
    "albumArt": "album art url",
    "year": 2001,
    "length": "3:04",
    "liked": true,
    "lastPlayed": "2022-01-09 00:25:13",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36",
    "Owner": {
      "id": 1,
      "firstName": "Gugu",
      "lastName": "Mbatha-Raw",
      "email": "gugu.gaga@app.io",
      "username": "GuguGaga"
    },
    "Playlists": [
      {
        "id": 1,
        "userId": 1,
        "name": "Nostalgia"
      }
    ],
  }
  ```

* **Error Response**: Couldn't find a Song with the specified Id
* **Status Code**: `404`
* **Headers**:
  * **Content-Type**: `application/json`
* **Body**:

```json
{
  "message": "No song found"
}
```

### Create a Song

Uploads and returns a new song.

* **Require Authentication**: true
* **Request**
* **Method**: `POST`
* **Route path**: `/api/songs`
* **Headers**:
  * **Content-Type**: `application/json`
* **Body**:

```json
{
  "title": "ALIVE",
  "artist": "ClariS",
  "file": "song file url",
  "anime": "Lycoris Recoil",
  "songImg": "song img url",
  "albumName": "ALIVE - Single",
  "albumArt": "album art url",
  "year": 2022,
}
```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 2,
    "ownerId": 1,
    "title": "ALIVE",
    "artist": "ClariS",
    "file": "song file url",
    "anime": "Lycoris Recoil",
    "songImg": "song img url",
    "albumName": "ALIVE - Single",
    "albumArt": "album art url",
    "year": 2022,
    "length": "3:04",
    "liked": null,
    "lastPlayed": null,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36",
  }
  ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "title": "Title is required",
      "title": "Title must be shorter than 50 characters",
      "albumName": "Album name must be shorter than 50 characters",
      "file": "Song file url is required",
      "file": "Song file must be smaller than 4G",
      "file": "Song file must be in AIFF, MP3 or WAV format",
      "albumImg": "Album img must be in JPG, JPEG, or PNG format",
      "anime": "Anime name is required"
    }
  }
  ```

### Add Like to a Song based on the Song's id

Create and return a new lyric for a song specified by id.

* **Require Authentication**: true
* **Require Proper Authorization**: Song must belong to the current user
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/songs/:songId/lyrics`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**: none

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "userId": 1,
    "songId": 1,
  }
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No song found"
  }
  ```

### Edit a Song

Updates and returns an existing song.

* **Require Authentication**: true
* **Require Proper Authorization**: Song must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/songs/:songId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "title": "ALIVE",
    "artist": "ClariS",
    "file": "song file url",
    "anime": "Lycoris Recoil",
    "songImg": "song img url",
    "albumName": "Iris",
    "albumArt": "album art url",
    "year": 2022,  
  }
  ```

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 2,
    "ownerId": 1,
    "title": "ALIVE",
    "artist": "ClariS",
    "file": "song file url",
    "anime": "Lycoris Recoil",
    "songImg": "song img url",
    "albumName": "Iris",
    "albumArt": "album art url",
    "year": 2022,
    "length": "3:04",
    "liked": null,
    "lastPlayed": null,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36",
  }
  ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request",
    "errors": {
      "file": "Song url is required",
      "title": "Title must be less than 50 characters",
      "artist": "Artist is required",
      "year": "Year is required",
      "albumName": "Album name must have minimum of 1 character",
      "albumImg": "Image url is required",
      "file": "Song file too large, must be below 4G",
      "file": "Song file must be in AIFF, MP3 or WAV format",
      "albumImg": "Album like must be in JPG, JPEG, or PNG format",
    }
  }
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No song found"
  }
  ```

### Delete a Song

Deletes an existing song.

* **Require Authentication**: true
* **Require Proper Authorization**: Song must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/songs/:songId`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Successfully deleted"
  }
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No song found"
  }
  ```

## PLAYLISTS

### Get all Playlists of the Current User

Returns all the playlists created by the current user.

* **Require Authentication**: true
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/playlists/current`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Playlists": [
      {
        "id": 1,
        "creatorId": 1,
        "name": "Nostalgia",
        "img": "img url",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    ]
  }
  ```
* **Error Response**: Couldn't find any playlists created by current user
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No lyric found"
  }
  ```

### Get all playlists by a Song's id

Returns all the playlists that a song is part of specified by id.

* **Require Authentication**: true
* **Require Authorizationn**: Playlist must belong to user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs/:songId/playlists`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Playlists": [
      {
        "id": 1,
        "creatorId": 1,
        "name": "Nostalgia",
        "img": "img url",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```

* **Error Response**: Couldn't find a Playlist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No playlist found"
  }
  ```

### Get playlists by Playlist id

Returns the playlist specified by id.

* **Require Authentication**: true
* **Require Authorizationn**: Playlist must belong to user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/playlists/:playlistId`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Playlists": [
      {
        "id": 1,
        "creatorId": 1,
        "name": "Nostalgia",
        "img": "img url",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```

* **Error Response**: Couldn't find a Playlist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No playlist found"
  }
  ```

### Add song to a Playlist based on the Playlist's id

Add song and return the new playlist for a song specified by id.

* **Require Authentication**: true
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/playlists/:playlistId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "songId": 1,
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Playlist": {
      "id": 1,
      "creatorId": 1,
      "name": "Nostalgia",
      "img": "img url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2025-01-09 20:39:36",
      "Songs": [
        {
          "id": 1,
          "ownerId": 1,
          "title": "Fukai Mori",
          "artist": "Do As Infinity",
          "file": "song1 url",
          "songImg": "song img url",
          "anime": "InuYasha","albumName": "Deep Forest",
          "albumArt": "album art url",
          "year": 2001,
          "length": "3:04",
          "liked": true,
          "lastPlayed": "2022-01-09 00:25:13",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
        ],
      }
    }
    ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "songId": "Song ID is required",
    }
  }
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No song found"
  }
  ```
* **Error Response**: Couldn't find a Playlist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No playlist found"
  }
  ```

* **Error Response**: Song already exists in user Playlist
  * **Status Code**: `500`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Song already in playlist"
  }
  ```

### Add song to a Playlist based on the Song's id

Add song and return the new playlist for a song specified by id.

* **Require Authentication**: true
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/songs/:songId/playlists`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "playlistId": 1,
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Playlist": {
      "id": 1,
      "creatorId": 1,
      "name": "Nostalgia",
      "img": "img url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2025-01-09 20:39:36",
      "Songs": [
        {
          "id": 1,
          "ownerId": 1,
          "title": "Fukai Mori",
          "artist": "Do As Infinity",
          "file": "song1 url",
          "songImg": "song img url",
          "anime": "InuYasha","albumName": "Deep Forest",
          "albumArt": "album art url",
          "year": 2001,
          "length": "3:04",
          "liked": true,
          "lastPlayed": "2022-01-09 00:25:13",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
        ],
      }
    }
    ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "playlistId": "Playlist ID is required",
    }
  }
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No song found"
  }
  ```
* **Error Response**: Couldn't find a Playlist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No playlist found"
  }
  ```

* **Error Response**: Song already exists in user Playlist
  * **Status Code**: `500`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Song already in playlist"
  }
  ```

### Edit a Playlist

Update and return an existing playlist.

* **Require Authentication**: true
* **Require Proper Authorization**: Playlist must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/playlists/:playlistId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Old School Anime",
    "img": "new img url"
  }
  ```

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
  "Playlist": {
    "id": 1,
    "creatorId": 1,
    "name": "Old School Anime",
    "img": "new img url",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 20:39:36",
    "Songs": [
      {
        "id": 1,
        "ownerId": 1,
        "title": "Fukai Mori",
        "artist": "Do As Infinity",
        "file": "song1 url",
        "songImg": "song img url",
        "anime": "InuYasha","albumName": "Deep Forest",
        "albumArt": "album art url",
        "year": 2001,
        "length": "3:04",
        "liked": true,
        "lastPlayed": "2022-01-09 00:25:13",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
      ],
    }
  }
  ```

* **Error Response**: Body validation errors
* **Status Code**: `400`
* **Headers**:
  * **Content-Type**: `application/json`
* **Body**:

```json
{
  "message": "Bad Request", 
  "errors": {
    "title": "Title must have a minimum of 3 characters",
    "img": "Image must be in JPG, JPEG, or PNG format",
  }
}
```

* **Error Response**: Couldn't find a Playlist with the specified id
* **Status Code**: `404`
* **Headers**:
  * **Content-Type**: `application/json`
* **Body**:

```json
{
  "message": "Playlist couldn't be found"
}
```

### Delete a Playlist

Delete an existing playlist.

* **Require Authentication**: true
* **Require Proper Authorization**: Playlist must belong to the current user
* **Request**
* **Method**: `DELETE`
* **Route path**: `/api/playlists/:playlistId`
* **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Successfully deleted"
  }
  ```

* **Error Response**: Couldn't find a Playlist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Playlist couldn't be found"
  }
  ```

## LYRICS

### Get all Lyrics

Return all the lyrics in system.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/lyrics/current`
  * **Body**: `none`
* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "AllLyrics": [
      {
      "id": 1,
      "creatorId": 1,
      "songId": 1,
      "type": "Romaji",
      "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```

* **Error Response**: Couldn't find any Lyrics in system
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No lyrics found"
  }
  ```

### Get all of the Current User's Lyrics

Return all the lyrics that the current user has made.

* **Require Authentication**: true
* **Require Authorization**: Lyrics must be uploaded by user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/lyrics/current`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "UploadedLyrics": {
      "romaji": [
      {
        "id": 1,
        "creatorId": 1,
        "songId": 1,
        "type": "Romaji",
        "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
      ],
    }
  }
  ```

* **Error Response**: Couldn't find any Lyrics submitted by user
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No lyrics found"
  }
  ```

### Get lyrics for a Song based on the Song's id

Return the lyrics for a song specified by song id.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs/:songId/lyrics`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {"SongLyrics": {
    "romaji": {
    "id": 1,
    "creatorId": 1,
    "songId": 1,
    "type": "Romaji",
    "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
    },
  }}
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Song not found"
  }
  ```
* **Error Response**: Couldn't find any Lyrics for song
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No lyrics found"
  }
  ```

### Get lyrics for a Song based on the Lyric's id

Return the lyrics for a song specified by lyric id.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/lyrics/:lyricId`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "creatorId": 1,
    "songId": 1,
    "type": "Romaji",
    "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
  }
  ```

### Submit Lyrics for a Song based on the Song's id

Create and return a new lyrics for a song specified by id.

* **Require Authentication**: true
* **Require Authorization**: Song must belong to user and not have lyrics already submitted
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/songs/:songId/lyrics`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "type": "romaji",
    "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {"SongLyrics": {
    "romaji": {
    "id": 1,
    "creatorId": 1,
    "songId": 1,
    "type": "Romaji",
    "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
    },
  }}
  ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "type": "Please select a type",
      "lyrics": "Lyrics are required",
    }
  }
  ```

* **Error Response**: Couldn't find a Song with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No song found"
  }
  ```

* **Error Response**: Lyric type conflict
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Song already has that type of lyrics",
  }
  ```

### Edit Lyrics

Update and return existing lyrics.

* **Require Authentication**: true
* **Require Proper Authorization**: Lyrics must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/lyrics/:lyricId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "type": "romaji",
    "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
  }
  ```

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "creatorId": 1,
    "songId": 1,
    "type": "Romaji",
    "lyrics": "fukai fukai mori no oku ni ima mo kitto\nokizari ni shita kokoro kakushite'ru yo\nsagasu hodo no chikara mo naku tsukarehateta\nhitobito wa eien no yami ni kieru\nchiisai mama nara kitto ima demo mieta ka na\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\naoi aoi sora no iro mo kidzukanai mama\nsugite yuku mainichi ga kawatte yuku\ntsukurareta wakugumi wo koe ima wo ikite\nsabitsuita kokoro mata ugokidasu yo\ntoki no rizumu wo shireba mo ichido toberu darou\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nshinjite'ru hikari motome\narukidasu kimi to ima\nboku-tachi wa ikiru hodo ni\nnakushite'ku sukoshi zutsu\nitsuwari ya uso wo matoi\ntachisukumu koe mo naku\nboku-tachi wa samayoi nagara\nikite yuku doko made mo\nfurikaeru\nmichi wo tozashi\naruite'ku eien ni",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
  }
  ```

* **Error Response**: Body validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Bad Request", 
    "errors": {
      "type": "Please select a type",
      "lyrics": "Lyrics cannot be blank"
    }
  }
  ```

* **Error Response**: Couldn't find Lyrics with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No lyric found"
  }
  ```

### Delete Lyrics

Delete existing lyrics.

* **Require Authentication**: true
* **Require Proper Authorization**: Lyrics must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/lyrics/:lyricId`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Successfully deleted"
  }
  ```

* **Error Response**: Couldn't find Lyrics with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No lyrics found"
  }
  ```

## LIKES

## View current user likes

View all of current user's liked songs and artists

* **Require Authentication**: true
* **Require Proper Authorization**: Like must belong to the current user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/likes/current`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Likes": [
      {
        "id": 1,
        "user_id": 1,
        "song_id": 1,
      }
    ]
  }
  ```
* **Error Response**: Couldn't find any Likes for the current user
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No likes found"
  }
  ```


### Delete a Like

Delete an existing Like by song id.

* **Require Authentication**: true
* **Require Proper Authorization**: Like must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/likes/:likeId`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Successfully deleted"
  }
  ```

* **Error Response**: Couldn't find any Likes for the provided id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Like not found"
  }
  ```

## Add Query Filters to Get All Songs

Return songs filtered by query parameters.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs`
  * Query Parameters
    * page: integer, minimum: 1, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * artistId: decimal, optional, minimum: 1
    * timesPlayed: decimal, optional, minimum: 0
    * maxLng: decimal, optional
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Songs": [
    {
      "id": 1,
      "ownerId": 1,
      "artistId": 1,
      "file": "song1 url",
      "title": "Pink + White",
      "date": "2016-08-20",
      "albumName": "Blonde",
      "albumImg": "song1 img url",
      "length": "3:04",
      "price": 0.99,
      "liked": true,
      "playMore": true,
      "playLess": null,
      "lastPlayed": "2022-01-09 00:25:13",
      "timesPlayed": 3,
      "explicit": true,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
  ],
    "page": 2,
    "size": 20
  }
  ```

* **Error Response**: Query parameter validation errors
  * **Status Code**: `400`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be between 1 and 20",
        "artistId": "Artist ID must be greater than 0"
      }
    }
    ```
