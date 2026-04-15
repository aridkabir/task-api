import { body } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

export const validateTask = [
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be at least 3 and at most 100 characters'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('completed must be true or false'),

  checkValidationResults,
];

export function validateTaskQuery(req, res, next) {
  const { completed } = req.query;

  if (completed === undefined) return next();

  if (completed !== 'true' && completed !== 'false') {
    return res.status(400).json({
      error: 'Invalid value for completed parameter.'
    });
  }

  next();
};
