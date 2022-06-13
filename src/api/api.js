import express from 'express'
import { Courses, Questions } from '../database/database.js'
import { validate } from 'jsonschema';
import { CourseSchema } from '../validation/schemas/courses.js';
import { QuestionSchema } from '../validation/schemas/questions.js';

const router = express.Router();

// Just say hello
router.get(
  '/',
  (req, res) => {
    res.send({
      message: `Welcome to the API of Exam Builder`,
      version: process.env.npm_package_version,
    });
  }
);

////////////////////////
//      Courses       //
////////////////////////

router.get(
  '/courses',
  (req, res) => {
    res.send(Courses.all());
  }
);

router.get(
  '/courses/:id',
  (req, res) => {
    res.send(Courses.find_by_id(parseInt(req.params.id)));
  }
);

router.post(
  '/courses',
  (req, res) => {
    console.log(req.body)
    const validation = validate(req.body, CourseSchema.create.body);
    if (!validation.valid) {
      return res.status(400).send({
        message: 'Invalid course information',
        errors: validation.errors.map(e => e.stack)
      });
    }

    Courses.create({
      title: req.body.title
    })
    .then((result) => {
      res.send(result);
    })
    .catch((reason) => {
      res.status(500).send({
        "message": reason
      })
    })
  }
);

////////////////////////
//     Questions      //
////////////////////////

router.get(
  '/questions',
  (req, res) => {
    res.send( Questions.all() );
  }
);

router.get(
  '/questions/:id',
  (req, res) => {
    res.send(Questions.find_by_id(parseInt(req.params.id)));
  }
);

router.post(
  '/questions',
  (req, res) => {
    console.log(req.body)
    const validation = validate(req.body, QuestionSchema.create.body);
    if (!validation.valid) {
      return res.status(400).send({
        message: 'Invalid question information',
        errors: validation.errors.map(e => e.stack)
      });
    }

    Questions.create({
      text: req.body.text,
      image: req.body.image,
      tags: req.body.tags,
      course_id: req.body.course_id,
      answers: req.body.answers
    })
    .then((result) => {
      res.send(result);
    })
    .catch((reason) => {
      res.status(500).send({
        "message": reason
      })
    })
  }
);

router.delete(
  '/questions/:id',
  (req, res) => {
    Questions.delete_by_id(parseInt(req.params.id))
    .then(() => {
      res.send({ message: 'Deleted successfully' })
    })
  }
)

router.get(
  '/questions/random/:amount',
  (req, res) => {
    res.send(Questions.get_random(req.params.amount));
  }
)

export default router;