const CourseSchema = {
  create: {
    body: {
      "type": "object",
      "properties": {
        "title": { "type": "string" },
      },
      "additionalProperties": false,
      "required": ["title"]
    }
  },
  update: {
    body: {
      "type": "object",
      "properties": {
        "id": { "type": "integer", "minimum": 1 },
        "title": { "type": "string" },
      },
      "additionalProperties": false,
      "required": [ "id" ]
    }
  },
}

export { CourseSchema }