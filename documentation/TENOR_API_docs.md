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
          "updatedAt": "2021-11-19 20:39:36",
          "Tags": [
            { 
              "id": 1,
              "song_id": 1,
              "artist_id": 1, 
              "name": "neo-soul",
              "custom": false
            },
            { 
              "id": 5,
              "song_id": 1,
              "artist_id": 1, 
              "name": "soothing",
              "custom": true
            },
          ],
          "Artist": {
            "id": 1,
            "name": "Frank Ocean",
            "liked": true,
            "playMore": true,
            "playLess": null,
            "Tags": [
              { 
                "id": 1,
                "song_id": 1,
                "artist_id": 1, 
                "name": "neo-soul",
                "custom": false
              },
              { 
                "id": 3,
                "song_id": 1,
                "artist_id": 1, 
                "name": "trip hop",
                "custom": false
              },
            ],
          },
          "Playlists": [
            {
              "id": 1,
              "userId": 1,
              "name": "Lazy Day"
            }
          ]
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
          "updatedAt": "2021-11-19 20:39:36",
          "Tags": [
            { 
              "id": 1,
              "song_id": 1,
              "artist_id": 1, 
              "name": "neo-soul",
              "custom": false
            },
            { 
              "id": 5,
              "song_id": 1,
              "artist_id": 1, 
              "name": "soothing",
              "custom": true
            },
          ],
          "Artist": {
            "id": 1,
            "name": "Frank Ocean",
            "liked": true,
            "playMore": true,
            "playLess": null,
            "Tags": [
              { 
                "id": 1,
                "song_id": 1,
                "artist_id": 1, 
                "name": "neo-soul",
                "custom": false
              },
              { 
                "id": 3,
                "song_id": 1,
                "artist_id": 1, 
                "name": "trip hop",
                "custom": false
              },
            ],
          },
          "Playlists": [
            {
              "id": 1,
              "userId": 1,
              "name": "Lazy Day"
            }
          ]
        },
      ]
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
      "file": "song1 url",
      "title": "Pink + White",
      "artist": "Frank Ocean",
      "date": "2016-08-20",
      "albumName": "Blonde",
      "albumImg": "song1 img url",
      "length": "3:04",
      "liked": "True",
      "playMore": "True",
      "playLess": null,
      "lastPlayed": "2025-01-09 00:19:47",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "Tags": ["neo-soul", "pop", "soothing", "laid-back", "trip hop", "smooth", "semi-explicit"],
      "Playlists": ["Lazy Day", "Road Trip", "Hangout"],
      "Artist": {
        "id": 1,
        "title": "Frank Ocean",
      },
      "Owner": {
        "id": 1,
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
      "message": "Song couldn't be found"
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
      "albumImg": "song1 img url"
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
      "title": "Pink + White",
      "artist": "Frank Ocean",
      "file": "song file url",
      "date": "2016-08-20",
      "albumName": "Blonde",
      "albumImg": "song1 img url",
      "playMore": null,
      "playLess": null,
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
        "title": "Title is required",
        "file": "Song file url is required",
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
      "name": "mellow"
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
      "name": "mellow",
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
      "message": "Song couldn't be found"
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
      "artist": "Frank Ocean",
      "albumName": "Blonde",
      "albumImg": "song1 img url",
      "playMore": "True",
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
      "title": "Pink + White",
      "artist": "Frank Ocean",
      "date": "2016-08-20",
      "albumName": "Blonde",
      "albumImg": "song1 img url",
      "playMore": "True",
      "playLess": null,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2025-01-09 20:39:36"
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
      "message": "Song couldn't be found"
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
      "message": "Song couldn't be found"
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
              "title": "Pink + White",
              "artist": "Frank Ocean",
              "albumName": "Blonde",
              "albumImg": "song1 img url",
              "Tags": ["neo-soul", "pop", "soothing", "laid-back", "trip hop", "smooth", "semi-explicit"] 
            },
          ],
          "Tags": [
            {
              "id": 1,
              "playlistId": 1,
              "name": "soothing",
              "custom": true
            },
          ]
        }
      ]
    }
    ```

### Get all playlists by a Song's id

Returns all the playlists that a song is part of specified by id.

* **Require Authentication**: false
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
          "name": "Lazy Day"
        },
        {
          "id": 2,
          "userId": 1,
          "name": "Road Trip"
        },
        {
          "id": 3,
          "userId": 1,
          "name": "Hangout"
        }
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
      "message": "Song couldn't be found"
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
        "updatedAt": "2021-11-19 20:39:36",
        "Songs": [
          {
            "id": 1
          }
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
      "message": "Song couldn't be found"
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
      "name": "soothing"
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
      "playlistId": 1,
      "name": "soothing",
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
      "id": 1,
      "userId": 1,
      "name": "Relaxation Day",
      "updatedAt": "2025-01-10 10:06:40"
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

## BOOKINGS

### Get all of the Current User's Bookings

Return all the bookings that the current user has made.

* **Require Authentication**: true
* **Request**
  * **Method**: `GET`
  * **Route path**: /api/bookings/current
  * **Body**: `none`

* **Successful Response**
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "Bookings": [
        {
          "id": 1,
          "songId": 1,
          "Song": {
            "id": 1,
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "title": "App Academy",
            "price": 123,
            "previewImage": "image url"
          },
          "userId": 2,
          "startDate": "2021-11-19",
          "endDate": "2021-11-20",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all Bookings for a Song based on the Song's id

Return all the bookings for a song specified by id.

* **Require Authentication**: true
* **Request**
  * **Method**: `GET`
  * **Route path**: /api/songs/:songId/bookings
  * **Body**: `none`

* **Successful Response**: If you ARE NOT the owner of the song.
  * **Status Code**: `200`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "Bookings": [
        {
          "songId": 1,
          "startDate": "2021-11-19",
          "endDate": "2021-11-20"
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
      "Bookings": [
        {
          "User": {
            "id": 2,
            "firstName": "Gugu",
            "lastName": "Mbatha-Raw"
          },
          "id": 1,
          "songId": 1,
          "userId": 2,
          "startDate": "2021-11-19",
          "endDate": "2021-11-20",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
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
      "message": "Song couldn't be found"
    }
    ```

### Create a Booking from a Song based on the Song's id

Create and return a new booking from a song specified by id.

* **Require Authentication**: true
* **Require Proper Authorization**: Song must NOT belong to the current user
* **Request**
  * **Method**: `POST`
  * **Route path**: /api/songs/:songId/bookings
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "startDate": "2021-11-19",
      "endDate": "2021-11-20"
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
      "songId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
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
        "startDate": "startDate cannot be in the past",
        "endDate": "endDate cannot be on or before startDate"
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
      "message": "Song couldn't be found"
    }
    ```

* **Error Response**: Booking conflict
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Sorry, this song is already booked for the specified dates",
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    }
    ```

### Edit a Booking

Update and return an existing booking.

* **Require Authentication**: true
* **Require Proper Authorization**: Booking must belong to the current user
* **Request**
  * **Method**: `PUT`
  * **Route path**: /api/bookings/:bookingId
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "startDate": "2021-11-19",
      "endDate": "2021-11-20"
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
      "songId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
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
        "startDate": "startDate cannot be in the past",
        "endDate": "endDate cannot be on or before startDate"
      }
    }
    ```

* **Error Response**: Couldn't find a Booking with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Booking couldn't be found"
    }
    ```

* **Error Response**: Can't edit a booking that's past the end date
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Past bookings can't be modified"
    }
    ```

* **Error Response**: Booking conflict
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Sorry, this song is already booked for the specified dates",
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    }
    ```

### Delete a Booking

Delete an existing booking.

* **Require Authentication**: true
* **Require Proper Authorization**: Booking must belong to the current user or the
  Song must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: /api/bookings/:bookingId
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

* **Error Response**: Couldn't find a Booking with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Booking couldn't be found"
    }
    ```

* **Error Response**: Bookings that have been started can't be deleted
  * **Status Code**: `403`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Bookings that have been started can't be deleted"
    }
    ```

## IMAGES

### Delete a Song Image

Delete an existing image for a Song.

* **Require Authentication**: true
* **Require Proper Authorization**: Song must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: /api/song-images/:imageId
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

* **Error Response**: Couldn't find a Song Image with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Song Image couldn't be found"
    }
    ```

### Delete a Review Image

Delete an existing image for a Review.

* **Require Authentication**: true
* **Require Proper Authorization**: Review must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: /api/review-images/:imageId
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

* **Error Response**: Couldn't find a Review Image with the specified id
  * **Status Code**: `404`
  * **Headers**:
    * **Content-Type**: `application/json`
  * **Body**:

    ```json
    {
      "message": "Review Image couldn't be found"
    }
    ```

## Add Query Filters to Get All Songs

Return songs filtered by query parameters.

* **Require Authentication**: false
* **Request**
  * **Method**: `GET`
  * **Route path**: /api/songs
  * Query Parameters
    * page: integer, minimum: 1, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * minLat: decimal, optional
    * maxLat: decimal, optional
    * minLng: decimal, optional
    * maxLng: decimal, optional
    * minPrice: decimal, optional, minimum: 0
    * maxPrice: decimal, optional, minimum: 0
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
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "title": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 4.5,
          "previewImage": "image url"
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
        "maxLat": "Maximum latitude is invalid",
        "minLat": "Minimum latitude is invalid",
        "minLng": "Maximum longitude is invalid",
        "maxLng": "Minimum longitude is invalid",
        "minPrice": "Minimum price must be greater than or equal to 0",
        "maxPrice": "Maximum price must be greater than or equal to 0"
      }
    }
    ```
