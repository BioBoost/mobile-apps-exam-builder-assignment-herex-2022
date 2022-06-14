# Mobile Apps - HerEx 2022 - Exam Builder

Welcome to Exam Builder. This web application allows a teacher to manage multiple choice exam questions and even generate exams on the fly. The application consists of three mayor parts:

* a database that stores the resources, in this case [lowdb](https://npm.io/package/lowdb) is used.
* a backend express application that provides an API to consume
* a frontend Vue application that provides a visual management tool for the user

In this challenge you will need to create a Vue frontend for a partially implemented backend API application and also the extend with some extra functionality.

## The Backend

The backend (express app) supplies access to Course and Question (multiple choice) resources by exposing a clean API for the frontend to consume. Below is a description of this API.

### Courses

A Course is a resource that models the courses the teacher is involved in. A Course has the following properties:

* `id`: a unique id for that course
* `title`: a unique title for that course

An example of a Course in JSON format:

```json
{
	"id": 3,
	"title": "Object Oriented Programming"
}
```

The following routes are available for the Course resource:

<hr />

**GET /courses**

* Retrieve all the Courses
* The API will respond with an array of objects

Example:

```json
[
  {
    "id": 3,
    "title": "Object Oriented Programming"
  },
  {
    "id": 4,
    "title": "Programming in C++"
  }
]
```

<hr />

**GET /courses/:id**

* Retrieve the details of a single course identified with the parameter `id`
* The API will respond with a single object

Example:

```json
{
	"id": 1,
	"title": "Object Oriented Programming"
}
```

<hr />

**POST /courses**

* Create a new Course object with the following required properties:
  * `title`

Example:

```json
{
	"title": "Object Oriented Programming"
}
```

* The API will respond with the newly created object

Example:

```json
{
	"id": 1,
	"title": "Object Oriented Programming"
}
```

<hr />

**PATCH /courses**

* Update an existing Course object with the following allowed properties:
  * `title`
* Note that `id` is required as a property to uniquely identify the object

Example:

```json
{
  "id": 3,
	"title": "Object Oriented Programming 2"
}
```

* The API will respond with the updated object

Example:

```json
{
  "id": 3,
	"title": "Object Oriented Programming 2"
}
```

<hr />

### Questions

A Question is a resource that models the multiple choice questions that a teacher can create for a given Course. A Question has the following properties:

* `id`: a unique id for that question
* `text`: the text for the question
* `image`: an image url
* `tags`: an array of strings that contain keywords for the question
* `course_id`: the id of the course the question belongs to
* `answers`: an array of the options of the multiple choice question. It consists of the following properties:
  * `text`: the answer text of this option
  * `is_correct`: a boolean indicating if this answer is correct or not

An example of a Question in JSON format:

```json
{
  "id": 9,
  "text": "What is constructor overloading ?",
  "image": "https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png",
  "tags": [
    "oop",
    "overloading",
    "constructor"
  ],
  "course_id": 3,
  "answers": [
    {
      "text": "Having a constructor in a subclass that replaces a constructor in the base class when implementing inheritance.",
      "is_correct": false
    },
    {
      "text": "Having multiple constructors for the same class but with a different parameter list.",
      "is_correct": true
    },
    {
      "text": "Having no constructors for a class and letting the programming language generate one for you.",
      "is_correct": false
    }
  ]
},
```

The following routes are available for the Question resource:

<hr />

**GET /questions**

* Retrieve all the Questions
* The API will respond with an array of objects

Example:

```json
[
	{
		"id": 10,
		"text": "What is the correct syntax for initializing an integer variable in C#",
		"image": "",
		"tags": [
			"c#",
			"integer",
			"variable"
		],
		"course_id": 2,
		"answers": [
			{
				"text": "int x = 123;",
				"is_correct": true
			},
			{
				"text": "int x : 123;",
				"is_correct": false
			},
			{
				"text": "int x (123);",
				"is_correct": false
			}
		]
	},
  {
    "id": 9,
    "text": "What is constructor overloading ?",
    "image": "https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png",
    "tags": [
      "oop",
      "overloading",
      "constructor"
    ],
    "course_id": 3,
    "answers": [
      {
        "text": "Having a constructor in a subclass that replaces a constructor in the base class when implementing inheritance.",
        "is_correct": false
      },
      {
        "text": "Having multiple constructors for the same class but with a different parameter list.",
        "is_correct": true
      },
      {
        "text": "Having no constructors for a class and letting the programming language generate one for you.",
        "is_correct": false
      }
    ]
  }
]
```

<hr />

**GET /questions/:id**

* Retrieve the details of a single question identified with the parameter `id`
* The API will respond with a single object
  * Note that when requesting the details of a question, the `course_id` property in the result is replaced and the actual course object is added in its place.

Example:

```json
{
	"id": 22,
	"text": "What is the correct syntax for initializing an integer variable in C#?",
	"image": "",
	"tags": [
		"c#",
		"integer",
		"variable",
    "initialization"
	],
	"answers": [
		{
			"text": "int x = 123;",
			"is_correct": true
		},
		{
			"text": "int x : 123;",
			"is_correct": false
		},
		{
			"text": "int x (123);",
			"is_correct": false
		}
	],
	"course": {
		"id": 2,
		"title": "Object Oriented Programming"
	}
}
```

<hr />

**POST /questions**

* Create a new Question object with the following required properties:
  * `title`
  * `course_id`
  * `text`
  * `answers`
* Note that the property `image` is optional

Example:

```json
{
  "text": "What is constructor overloading ?",
  "image": "https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png",
  "tags": [
    "oop",
    "overloading",
    "constructor"
  ],
  "course_id": 3,
  "answers": [
    {
      "text": "Having a constructor in a subclass that replaces a constructor in the base class when implementing inheritance.",
      "is_correct": false
    },
    {
      "text": "Having multiple constructors for the same class but with a different parameter list.",
      "is_correct": true
    },
    {
      "text": "Having no constructors for a class and letting the programming language generate one for you.",
      "is_correct": false
    }
  ]
}
```

* The API will respond with the newly created object

Example:

```json
{
  "id": 9,
  "text": "What is constructor overloading ?",
  "image": "https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png",
  "tags": [
    "oop",
    "overloading",
    "constructor"
  ],
  "course_id": 3,
  "answers": [
    {
      "text": "Having a constructor in a subclass that replaces a constructor in the base class when implementing inheritance.",
      "is_correct": false
    },
    {
      "text": "Having multiple constructors for the same class but with a different parameter list.",
      "is_correct": true
    },
    {
      "text": "Having no constructors for a class and letting the programming language generate one for you.",
      "is_correct": false
    }
  ]
}
```

<hr />

**PATCH /questions**

* Update an existing Question object with the following allowed properties:
  * `title`
  * `course_id`
  * `text`
  * `answers`
  * `image`
* Note that `id` is required as a property to uniquely identify the object

Example:

```json
{
  "id": 9,
  "tags": [
    "oop",
    "overloading",
    "constructor",
    "class"
  ]
}
```

* The API will respond with the updated object

Example:

```json
{
  "id": 9,
  "text": "What is constructor overloading ?",
  "image": "https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png",
  "tags": [
    "oop",
    "overloading",
    "constructor",
    "class"
  ],
  "course_id": 3,
  "answers": [
    {
      "text": "Having a constructor in a subclass that replaces a constructor in the base class when implementing inheritance.",
      "is_correct": false
    },
    {
      "text": "Having multiple constructors for the same class but with a different parameter list.",
      "is_correct": true
    },
    {
      "text": "Having no constructors for a class and letting the programming language generate one for you.",
      "is_correct": false
    }
  ]
}
```

<hr />

**DELETE /questions/:id**

* Delete the question object identified with the parameter `id`
* The API will respond with an object containing a message property if the action succeeded.

Example:

```json
{
	"message": "Deleted successfully"
}
```

<hr />

**GET /questions/random/:amount**

* Retrieve random questions.
* The number of random questions is defined using the route parameter `:amount`
* The API will respond with an array of objects

Example:

```json
[
	{
		"id": 10,
		"text": "What is the correct syntax for initializing an integer variable in C#",
		"image": "",
		"tags": [
			"c#",
			"integer",
			"variable"
		],
		"course_id": 2,
		"answers": [
			{
				"text": "int x = 123;",
				"is_correct": true
			},
			{
				"text": "int x : 123;",
				"is_correct": false
			},
			{
				"text": "int x (123);",
				"is_correct": false
			}
		]
	},
  {
    "id": 9,
    "text": "What is constructor overloading ?",
    "image": "https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png",
    "tags": [
      "oop",
      "overloading",
      "constructor"
    ],
    "course_id": 3,
    "answers": [
      {
        "text": "Having a constructor in a subclass that replaces a constructor in the base class when implementing inheritance.",
        "is_correct": false
      },
      {
        "text": "Having multiple constructors for the same class but with a different parameter list.",
        "is_correct": true
      },
      {
        "text": "Having no constructors for a class and letting the programming language generate one for you.",
        "is_correct": false
      }
    ]
  }
]
```


<!-- 



## The Frontend

The frontend (Vue app) provides a nice user interface that allows the management of the devices.

Existing devices should be listed with basic information. A user should be able to request the details of each device.

A user should be allowed to create new devices with the following information (minimum but not limited to):

* name for the device
* some sort of GUID (retrieved from scanned QR code)
* a description
* a picture / image of the device
* a location (use GPS location service)

Registering a device should be achieved by embedding a URL inside a QR code which also contains the GUID of the device. Scanning the URL should automatically bring you to the registration page with the GUID filled in. If the device is already registered it should provide the details page of the device.

Uploading an image to the backend can be achieved using a package such as `multer`.

Provide the functionality for the user to be able to:

* register a new user account
* login
* logout
* a profile page with an avatar, firstname, lastname and email

Make sure to provide a docker container for the Vue app.

## Docker Compose

To allow all containers to be spun up easily, you should also provide a docker compose file. Place it in the root of this repository.

## Decent Readme

Provide a decent README for this project. Rename this `README.md` file to `assignment.md` and provide your own README.

Make sure the following topics are provided (minimally):

* Project Description with screenshots
* Author
* Service diagram (use draw.io or similar)
* How to setup
* API description
* Pitfalls / ToDo's / ...

## Evaluation

The following criteria will be taken into consideration when this assignment is evaluated.

| Criteria | Score |
| --- | :---: |
| README | 0 - 4 |
| RESTfull API | 0 - 4 |
| Image Upload | 0 - 2 |
| Authentication | 0 - 8 |
| QR code | 0 - 2 |
| Device GPS location | 0 - 2 |
| User friendliness | 0 - 4 |
| Creativity | 0 - 2 |
| Device creation | 0 - 4 |
| Device listing | 0 - 2 |
| Device details | 0 - 2 |
| Docker-compose | 0 - 2 |
| Docker frontend | 0 - 1 |
| Docker backend | 0 - 1 | -->