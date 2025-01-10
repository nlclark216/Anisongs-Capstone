# Tenor Music App

## Database Schema Design

![db-schema]

[db-schema]: ./db_schema/tenor_db.png
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
    ]
  }
  ```

### Get all Songs uploaded by the Current User

Returns all the songs owned (uploaded) by the current user.

* **Require Authentication**: true
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
        "artistId": 1,
        "ownerId": 1,
        "file": "song1 url",
        "title": "Pink + White",
        "date": "2016-08-20",
        "albumName": "Blonde",
        "albumImg": "song1 img url",
        "length": "3:04",
        "price": null,
        "liked": true,
        "playMore": true,
        "playLess": null,
        "lastPlayed": "2022-01-09 00:25:13",
        "timesPlayed": 3,
        "explicit": true,
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
    "artistId": 1,
    "ownerId": 1,
    "file": "song1 url",
    "title": "Pink + White",
    "date": "2016-08-20",
    "albumName": "Blonde",
    "albumImg": "song1 img url",
    "length": "3:04",
    "price": null,
    "liked": null,
    "playMore": null,
    "playLess": null,
    "lastPlayed": "2022-01-09 00:25:13",
    "timesPlayed": 3,
    "explicit": true,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36",
    "Tags": [
          { 
            "id": 1,
            "creatorId": 1,
            "artistId": 1,
            "songId": 1,
            "playlistId": null,
            "name": "Soothing",
            "type": "mood",
            "custom": true,
            "preferred": true,
          },
        ],
    "Playlists": [
          {
            "id": 1,
            "userId": 1,
            "name": "Lazy Day"
          }
        ],
    "Artist": {
      "id": 1,
      "name": "Frank Ocean",
      "liked": true,
      "playMore": true,
      "playLess": null,
    },
    "Owner": {
      "id": 1,
      "firstName": "Gugu",
      "lastName": "Mbatha-Raw",
      "email": "gugu.gaga@app.io",
      "username": "GuguGaga"
    }
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
  "title": "Pink + White",
  "artist": "Frank Ocean",
  "file": "song file url",
  "date": "2016-08-20",
  "albumName": "Blonde",
  "albumImg": "song1 img url",
  "liked": true,
  "playMore": true,
  "playLess": null,
  "explicit": false
}
```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "ownerId": 1,
    "artistId": 1,
    "ownerId": 1,
    "file": "song1 url",
    "title": "Pink + White",
    "date": "2016-08-20",
    "albumName": "Blonde",
    "albumImg": "song1 img url",
    "length": "3:04",
    "price": null,
    "liked": true,
    "playMore": true,
    "playLess": null,
    "explicit": false,
    "lastPlayed": "2022-01-09 00:25:13",
    "timesPlayed": 3,
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
      "albumImg": "Album like must be in JPG, JPEG, or PNG format",
    }
  }
  ```

### Add Tag to a Song based on the Song's id

Create and return a new tag for a song specified by id.

* **Require Authentication**: true
* **Require Proper Authorization**: Song must belong to the current user
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/songs/:songId/tags`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Mellow"
  }
  ```

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
    "name": "Mellow",
    "custom": true
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
    "file": "song1 url",
    "title": "Pink + White",
    "artistId": 1,
    "albumName": "Blonde",
    "albumImg": "song1 img url",
    "liked": true,
    "playMore": true,
    "playLess": null,   
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
    "ownerId": 1,
    "artistId": 1,
    "file": "song1 url",
    "title": "Pink + White",
    "date": "2016-08-20",
    "albumName": "Blonde",
    "albumImg": "song1 img url",
    "playMore": true,
    "playLess": null,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 20:39:36",
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
      "date": "Date is required",
      "albumName": "Album name is required",
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
        "userId": 1,
        "name": "Lazy Day",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
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
            "playMore": true,
            "playLess": null,
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2025-01-09 20:39:36",
          },
        ],
        "Tags": [
          {
            "id": 1,
            "playlistId": 1,
            "name": "Soothing",
            "custom": true
          },
        ]
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
    "message": "No tag found"
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
        "userId": 1,
        "name": "Lazy Day",
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

### Add song to a Playlist for a Song based on the Song's id

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
    "songId": 1,
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
      "userId": 1,
      "name": "Lazy Day",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2025-01-09 20:39:36",
      "Songs": [
        {
          "id": 1,
          "ownerId": 1,
          "artistId": 1,
          "file": "song1 url",
          "title": "Pink + White",
          "artistId": 1,
          "date": "2016-08-20",
          "albumName": "Blonde",
          "albumImg": "song1 img url",
          "playMore": true,
          "playLess": null,
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2025-01-09 20:39:36",
          }
        ],
        "Tags": [
            {
              "id": 1,
              "playlistId": 1,
              "name": "Soothing",
              "custom": true
            },
          ]
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

### Add an Tag to a Playlist based on the Playlist's id

Create and return a new tag for a playlist specified by id.

* **Require Authentication**: true
* **Require Proper Authorization**: Playlist must belong to the current user
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/playlists/:playlistId/tags`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Soothing"
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
  {
    "id": 1,
    "playlistId": 1,
    "name": "Soothing",
    "custom": true
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

* **Error Response**: Cannot add any more tags because the maximum is 10 tags per resource
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Maximum number of tags for this resource was reached"
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
    "name": "Relaxation Day"
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
      "userId": 1,
      "name": "Relaxation Day",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2025-01-09 20:39:36",
      "Songs": [
        {
          "id": 1,
          "ownerId": 1,
          "artistId": 1,
          "file": "song1 url",
          "title": "Pink + White",
          "artistId": 1,
          "date": "2016-08-20",
          "albumName": "Blonde",
          "albumImg": "song1 img url",
          "playMore": true,
          "playLess": null,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2025-01-09 20:39:36",
        }
      ],
      "Tags": [
          {
            "id": 1,
            "playlistId": 1,
            "name": "Soothing",
            "custom": true
          },
        ]
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
    "name": "Name must have a minimum of 3 characters",
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

## TAGS

### Get all of the Current User's Tags

Return all the tags that the current user has made.

* **Require Authentication**: true
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/tags/current`
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
        "id": 1,
        "creatorId": 1,
        "artistId": 1,
        "songId": 1,
        "playlistId": 1,
        "name": "Soothing",
        "type": "mood",
        "custom": true,
        "preferred": true,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```
### Create a Tag from a Artist based on the Artist's id

Create and return a new tag for a artist specified by id.

* **Require Authentication**: true
* **Require Authorization**: Tag must not have same `name` AND `creatorId` as another tag
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/artists/:artistId/tags`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Soothing",
    "type": "mood",
    "preferred": true
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "creatorId": 1,
    "artistId": 1,
    "songId": null,
    "playlistId": null,
    "name": "Soothing",
    "type": "mood",
    "custom": true,
    "preferred": true,
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
    }
  }
  ```

* **Error Response**: Couldn't find an Artist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No artist found"
  }
  ```

* **Error Response**: Tag conflict
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Tag already exists for this artist",
    "errors": {
      "message": "Tag already exists for this artist"
    }
  }
  ```

### Get all tags for a Artist based on the Artist's id

Return all the tags for a artist specified by id.

* **Require Authentication**: true
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/artists/:artistId/tags`
  * **Body**: `none`

* **Successful Response**: If you ARE NOT the creator of the tag.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
      "id": 2,
      "creatorId": null,
      "artistId": 1,
      "songId": null,
      "playlistId": null,
      "name": "Hip Hop",
      "type": "genre",
      "custom": false,
      "preferred": false,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

* **Successful Response**: If you ARE the creator of the tag.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
        "id": 1,
        "creatorId": 1,
        "artistId": 1,
        "songId": null,
        "playlistId": null,
        "name": "Soothing",
        "type": "mood",
        "custom": true,
        "preferred": true,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
  }
  ```

* **Error Response**: Couldn't find an Artist with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Artist not found"
  }
  ```

### Create a Tag for a Playlist based on the Playlist's id

Create and return a new tag for a playlist specified by id.

* **Require Authentication**: true
* **Require Authorization**: Tag must not have same `name` AND `creatorId` as another tag
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/playlists/:playlistId/tags`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Soothing",
    "type": "mood",
    "preferred": true
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "name": "Soothing",
    "creatorId": 1,
    "artistId": null,
    "songId": null,
    "playlistId": 1,
    "type": "mood",
    "custom": true,
    "preferred": true,
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
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
    "message": "No playlist found"
  }
  ```

* **Error Response**: Tag conflict
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Tag already exists",
    "errors": {
      "playlist": "Tag already exists for this playlist",
      "message": "Tag already in system, must update"
    }
  }
  ```

### Get all tags for a Playlist based on the Playlist's id

Return all the tags for a playlist specified by id.

* **Require Authentication**: true
* **Require Authorization**: User must be creator of 
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/playlists/:playlistId/tags`
  * **Body**: `none`

* **Successful Response**: If you ARE NOT the owner of the tag.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
      "id": 2,
      "creatorId": null,
      "artistId": null,
      "songId": null,
      "playlistId": 1,
      "name": "Hip Hop",
      "type": "genre",
      "custom": false,
      "preferred": false,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

* **Successful Response**: If you ARE the owner of the song.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
        "id": 1,
        "creatorId": 1,
        "artistId": null,
        "songId": null,
        "playlistId": 1,
        "name": "Soothing",
        "type": "mood",
        "custom": true,
        "preferred": true,
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

### Create a Tag for a Song based on the Song's id

Create and return a new tag for a song specified by id.

* **Require Authentication**: true
* **Require Authorization**: Tag must not have same `name` AND `creatorId` as another tag
* **Request**
  * **Method**: `POST`
  * **Route path**: `/api/songs/:songId/tags`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Soothing",
    "type": "mood",
    "preferred": true
  }
  ```

* **Successful Response**
  * **Status Code**: `201`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "id": 1,
    "creatorId": 1,
    "artistId": null,
    "songId": 1,
    "playlistId": null,
    "name": "Soothing",
    "type": "mood",
    "custom": true,
    "preferred": true,
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
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

* **Error Response**: Tag conflict
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "Tag already exists",
    "errors": {
      "song": "Tag already exists for this song",
      "message": "Tag already in system, must update"
    }
  }
  ```

### Get all tags for a Song based on the Song's id

Return all the tags for a song specified by id.

* **Require Authentication**: true
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs/:songId/tags`
  * **Body**: `none`

* **Successful Response**: If you ARE NOT the owner of the song.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
      "id": 2,
      "creatorId": null,
      "artistId": 1,
      "songId": 1,
      "playlistId": null,
      "name": "Hip Hop",
      "type": "mood",
      "custom": false,
      "preferred": false,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
      }
    ]
  }
  ```

* **Successful Response**: If you ARE the owner of the song.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "Tags": [
      {
        "id": 1,
        "creatorId": 1,
        "artistId": 1,
        "songId": 1,
        "playlistId": null,
        "name": "Soothing",
        "type": "mood",
        "custom": true,
        "preferred": true,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      },
    ]
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

### Edit a Tag

Update and return an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/tags/:tagId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Trip Hop",
    "type": "genre",
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
    "name": "Trip Hop",
    "creatorId": 1,
    "artistId": null,
    "songId": 1,
    "playlistId": null,
    "type": "mood",
    "custom": true,
    "preferred": true,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 00:39:36"
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
    }
  }
  ```

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```


### Edit a Song Tag

Update and return an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/songs/:songId/tags/:tagId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Trip Hop",
    "type": "genre",
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
    "name": "Trip Hop",
    "creatorId": 1,
    "artistId": null,
    "songId": 1,
    "playlistId": null,
    "type": "mood",
    "custom": true,
    "preferred": true,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 00:39:36"
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
    }
  }
  ```

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Edit an Artist Tag

Update and return an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user 
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/artists/:artistId/tags/:tagId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Trip Hop",
    "type": "genre",
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
    "artistId": 1,
    "songId": null,
    "playlistId": null,
    "name": "Trip Hop",
    "type": "genre",
    "custom": true,
    "preferred": true,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 00:39:36"
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
    }
  }
  ```

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Edit a Playlist Tag

Update and return an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag and Playlist must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/playlists/:playlistId/tags/:tagId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Trip Hop",
    "type": "genre",
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
    "artistId": null,
    "songId": null,
    "playlistId": 1,
    "name": "Trip Hop",
    "type": "mood",
    "custom": true,
    "preferred": true,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 00:39:36"
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
    }
  }
  ```

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Edit a Song Tag

Update and return an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: `/api/songs/:songId/tags/:tagId`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "name": "Trip Hop",
    "type": "genre",
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
    "artistId": 1,
    "songId": 1,
    "playlistId": null,
    "name": "Trip Hop",
    "type": "mood",
    "custom": true,
    "preferred": true,
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2025-01-09 00:39:36"
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
      "name": "Name cannot be blank",
      "name": "Name must be a minimum of 3 characters",
      "type": "Please select a type"
    }
  }
  ```

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Delete a Tag

Delete an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/tags/:tagId`
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

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Delete an Artist Tag

Delete an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/artists/:artistId/tags/:tagId`
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

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Delete a Playlist Tag

Delete an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag and Playlist must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/playlists/:playlistId/tags/:tagId`
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

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
  }
  ```

### Delete a Song Tag

Delete an existing tag.

* **Require Authentication**: true
* **Require Proper Authorization**: Tag must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/songs/:songId/tags/:tagId`
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

* **Error Response**: Couldn't find a Tag with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

  ```json
  {
    "message": "No tag found"
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
        "song_id": null,
        "artist_id": 1
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

## View Song Likes

View all the songs the current user likes

* **Require Authentication**: true
* **Require Proper Authorization**: Like must belong to the current user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/songs/likes`
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
        "artist_id": 1
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

## View Artist Likes

View all the artists the current user likes

* **Require Authentication**: true
* **Require Proper Authorization**: Like must belong to the current user
* **Request**
  * **Method**: `GET`
  * **Route path**: `/api/artists/likes`
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
        "song_id": null,
        "artist_id": 1
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

### Delete a Song Like

Delete an existing song like.

* **Require Authentication**: true
* **Require Proper Authorization**: Like must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/songs/:likeId`
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

### Delete an Artist Like

Delete an existing artist like.

* **Require Authentication**: true
* **Require Proper Authorization**: Like must belong to the current user
* **Request**
  * **Method**: `DELETE`
  * **Route path**: `/api/artists/:likeId`
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

* **Error Response**: Couldn't find an Artist Like with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "No Like found"
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
