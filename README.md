# Mobile Apps - HerEx 2022 - Exam Builder

Welcome to Exam Builder. This web application allows a teacher to manage multiple choice exam questions and even generate exams on the fly consisting of a random set of questions. The application consists of three mayor parts:

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

---

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

---

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

---

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

---

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

---

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
  * The number of items in `answers` is limited within the range of `[2,10]`

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

---

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

---

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

---

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

---

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

---

**DELETE /questions/:id**

* Delete the question object identified with the parameter `id`
* The API will respond with an object containing a message property if the action succeeded.

Example:

```json
{
	"message": "Deleted successfully"
}
```

---

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

## Play with the API

Before starting on this assignment make sure to play with the API a couple of times  so you get to know it. You can use a tool such as Insomnia or Postman for that.

## The Frontend

The frontend (Vue app) provides a nice user interface that allows the management of the course and question resources.

In context of the courses, the user should be able to:

* List the current existing courses
* Create new courses
* Update existing courses

In context of the questions, the user should be able to:

* List all current questions
* Create new questions with all the required properties
* Update existing questions
* Delete questions

The user should be able to generate a listing of random questions to be used for example for an examination. Start by asking the user how many questions to generate. Then show an overview of the questions and allow the user to filter out questions by excluding them. Once finished generate markdown output in the following format (make sure the user can copy/paste it easily or download it as a markdown file):

```markdown
1. This is the text of question 1.

![Image](https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png)

* [ ] This is option 1
* [ ] This is option 2
* [ ] This is option 3
* [ ] This is option 4

---

2. This is the text of question 2.

![Image](https://i.pinimg.com/originals/86/ed/a1/86eda15f128f98d70ab2d3fffd206a2c.png)

* [ ] This is option 1
* [ ] This is option 2
* [ ] This is option 3
* [ ] This is option 4

---

and so on ...
```

Generally you should pay special attention to:

* Uniform layout and styling (use vuetify)
* User Experience
* Input validation
* Catch error conditions as handle them appropriately
* Make use of the good practices taught in the lessons
  * DRY code
  * SOLID principles
  * Make use of the vuex store
  * commit regularly
  * ...

Make sure to also create a nice home page for this project (feel free on how to fill it in).

Note that the frontend does not include any authorization of authentication. This is not a requirement of the project. Neither is creating a PWA.

## Enable/Disable

The backend currently does not support enabling/disable questions. This is a useful feature if you wish to keep old questions for inspiration but do not want them in the random listing.

Allow a question to be set as enabled/disabled via the API. If the property is not provided @ creation, than you can assume a question to be enabled. Make sure that disabled questions are not included in the random question listing.

Also make sure to alter the validation of the question resource to include the property.

Lastly allow the user to enable/disable questions via the frontend. It should be none-intrusive. In other words, add for example a toggle button next to the question in the overview which quickly allows a question to be disabled/enabled.

## Docker

Make sure that the frontend runs in a docker container and that the docker-compose file accompanying this repository is altered to automatically include the frontend application.

## Example Questions

Make sure to provide a file called `./backend/data/example.db.json` with at least 2 courses and 10 example questions. You can commit these to the repository.

*Note that the actual database `db.json` is not committed into the git repo. This has been done on purpose. Please keep it like that*.

## Decent Readme

Provide a decent README for this project. Rename this `README.md` file to `assignment.md` and provide your own README.

Make sure the following topics are provided (minimally):

* Project Description with screenshots
* Author
* Service diagram (use draw.io or similar)
* How to setup
* API description (copy past from this README and extend with the extra properties)
* Pitfalls / ToDo's / ...
