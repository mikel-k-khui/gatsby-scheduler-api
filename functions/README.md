# gatsby-scheduler-api

The database is created in Firebase. You can manually create data using the firebase console.

Alternatively, you can use the reset script provided in the utils folder under roots to reset the data.

[Firebase SDK Reference](https://firebase.google.com/docs/reference/js)

[Admin SDK Reference](https://firebase.google.com/docs/reference/admin/node)

## Seeding

Run the seed script in utils with `node ./script/seed.js`.

## Callable Functions

All dates input and output for web are date objects. Dates in firebase are stored as Firebase.Timestampes.

### getAppointments

Returns a list of appointment from the Monday of the week in input to the Friday of the following week.

Input
``` json
{
  "data": {
    "today": Date
  }
}
```


Response | Description
--- | ---
200 | OK with exception of `error`
404 | Not Found response - no client function found
400 | Bad Request - incorrect format (i.e. not JSON, invalid fields)
401 | Unauthorized
500 | Internal Server Error - e.g. unhandled exception, return a failed Promise

`error` field is present in response body, then the request is considered failed, regardless of the HTTP status code.

```array with 200
[
  {
    "id": string,
    "slot": number,
    "date": date,
    "requesterName": string [100 char],
    "requesterEmail": string,
    "resourceId": string,
    "note": string [200 char],
    "createdAt": date,
    "updatedAt"?: date,
  },...
]
```

### setAppointment

Set an appointment for requester

Input
``` json
{
  "data": {
    "slot": number,
    "date": date,
    "email": string,
    "name": string [100 char],
    "note": string [200 char]
  }
}
```


Response | Description
--- | ---
200 | OK with exception of `error`
404 | Not Found response - no client function found
400 | Bad Request - incorrect format (i.e. not JSON, invalid fields)
401 | Unauthorized
500 | Internal Server Error - e.g. unhandled exception, return a failed Promise

`error` field is present in response body, then the request is considered failed, regardless of the HTTP status code.

```return new object with 200
  {
    "id": string,
    "slot": number,
    "date": date,
    "requesterName": string [100 char],
    "requesterEmail": string,
    "resourceId": string,
    "note": string [200 char],
    "createdAt": date,
  }
```

### cancelAppointment

Set an appointment for requester

Input
``` json
{
  "data": {
    "id": string,
    "note"?: string [200 char]
  }
}
```


Response | Description
--- | ---
200 | OK with exception of `error`

`error` field is present in response body, then the request is considered failed, regardless of the HTTP status code.

```return new object with 200
  {
    "id": string
  }
```

### getSetup

Returns a list of (fixed) resources from the users.

Input
``` json
{
  "data": {
  }
}
```

Response | Description
--- | ---
200 | OK with exception of `error`
404 | Not Found response - no client function found
400 | Bad Request - incorrect format (i.e. not JSON, invalid fields)
401 | Unauthorized
500 | Internal Server Error - e.g. unhandled exception, return a failed Promise

`error` field is present in response body, then the request is considered failed, regardless of the HTTP status code.

```setup with 200
{
  "resources":
  [
    {
      "id": same as authentication uid,
      "displayName": string [100 char],
      "email": string,
      "workHours"?: {
        "1": boolean,
        "2": boolean,
        ...,
        "24": boolean
      },
      "role": "resource" | null,
      "biography"?: string [200 char] required if role="resource",
      "createdAt": date,
      "updatedAt"?: date,
    },...
  ],
  "slots": {
    "1": string - system 1st appointment,
    "2": string,
    ...,
    "24": string
  }
}
```
