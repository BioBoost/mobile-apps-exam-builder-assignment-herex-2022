const QuestionSchema = {
  create: {
    body: {
      "type": "object",
      "properties": {
        "text": { "type": "string" },
        "image": { "type": "string" },  // , "format" : "uri"
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 1
        },
        "course_id": { "type": "integer", "minimum": 1 },
        "answers": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "text": { "type": "string" },
              "is_correct": { "type": "boolean" }
            },
            "required": [ "text", "is_correct" ]
          },
          "minItems": 2,
          "maxItems": 10
        }
      },
      "additionalProperties": false,
      "required": [ "course_id", "text", "tags", "answers" ]
    }
  },
}

export { QuestionSchema }