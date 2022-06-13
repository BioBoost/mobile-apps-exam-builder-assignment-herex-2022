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
}

export { CourseSchema }