import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { ResourceError } from '../helpers/error_handling.js'
import { shuffle } from '../helpers/random.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../../data/db.json');
const db = new Low(new JSONFile(file));

const connect = async () => {
  console.log("Reading json database")
  await db.read();

  // Create empty sets if none exist
  db.data = db.data || {}
  db.data.courses = db.data.courses || []
  db.data.questions = db.data.questions || []

  console.log(db.data)
}

const Courses = {
  _next_id: () => {
    const id = Math.max(...db.data.courses.map(d => d.id))
    return (id > 0 ? id + 1 : 1);
  },

  _is_title_unique: (title) => {
    return (db.data.courses.find(c => c.title === title) === undefined);
  },

  create: ({
    title = ""
  } = {}) => {

    if (!Courses._is_title_unique(title)) throw new ResourceError("Course title already used", 409)

    const obj = {
      id: Courses._next_id(),
      title: title
    };
    db.data.courses.push(obj);
    
    return new Promise((resolve, reject) => {
      db.write()
        .then(() => resolve(obj))
        .catch(() => {
          db.data.courses.pop();    // Undo adding course
          reject("Failed to create course")
        })
    });

  },

  find_by_id: (id) => {
    const obj = db.data.courses.find(c => c.id === id);
    if (!obj) throw new ResourceError("Course not found with that id", 404);

    return structuredClone(obj);
  },

  all: () => {
    return structuredClone(db.data.courses);     // Deep clone
  },
}

const Questions = {
  _next_id: () => {
    const id = Math.max(...db.data.questions.map(d => d.id))
    return (id > 0 ? id + 1 : 1);
  },

  create: ({
    text = "",
    image = "",
    tags = [],
    course_id = 0,
    answers = []
  } = {}) => {

    const course = Courses.find_by_id(course_id);     // Throws if not found

    const obj = {
      id: Questions._next_id(),
      text: text,
      image: image,
      tags: tags,
      course_id: course_id,
      answers: answers
    };
    db.data.questions.push(obj);
    
    return new Promise((resolve, reject) => {
      db.write()
        .then(() => resolve(obj))
        .catch(() => {
          db.data.questions.pop();    // Undo adding question
          reject("Failed to write db to disk")
        })
    });
  },

  find_by_id: (id) => {
    let question = structuredClone(db.data.questions.find(q => q.id === id));
    if (!question) throw new ResourceError("Question not found with that id", 404);

    question.course = Courses.find_by_id(question.course_id);   // Throws if not found !
    delete question.course_id;

    return question;
  },

  all: () => {
    return structuredClone(db.data.questions);
  },

  delete_by_id: (id) => {
    const target = Questions.find_by_id(id);    // Check if exists - throws if not found
    const original = structuredClone(db.data.questions);
    db.data.questions = db.data.questions.filter(q => q.id !== id);   // Delete
    
    return new Promise((resolve, reject) => {
      db.write()
        .then(() => resolve({}))
        .catch(() => {
          db.data.questions = original;   // Restore original
          reject("Failed to remove course")
        })
    });
  },

  get_random(amount = 1) {
    // We could filter here first (for example on tags)
    
    let questions = Questions.all();
    shuffle(questions);
    return questions.slice(0, amount).map(q => Questions.find_by_id(q.id));
  }
}

export { connect, Courses, Questions }