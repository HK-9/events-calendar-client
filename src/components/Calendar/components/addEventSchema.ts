import * as Yup from 'yup';

export const addEventSchema = Yup.object().shape({
  name: Yup.string()
    .required('Event name is required')
    .min(3, 'Event name must be at least 3 characters long')
    .max(100, 'Event name cannot be more than 100 characters'),

  startDate: Yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date cannot be in the past')
    .typeError('Please enter a valid start date'),

  endDate: Yup.date()
    .required('End date is required')
    .min(
      Yup.ref('startDate'),
      'End date must be later than or equal to the start date'
    )
    .typeError('Please enter a valid end date'),
});
