import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema } from '../../utils/validation';
import { JOB_TYPES } from '../../utils/helpers';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

export default function JobForm({ initial, onSubmit, onCancel, submitLabel = 'Save job' }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initial?.title || '',
      company: initial?.company || '',
      location: initial?.location || '',
      type: initial?.type || 'Full-time',
      salary: initial?.salary || '',
      description: initial?.description || '',
      requirementsText: initial?.requirements?.join('\n') || '',
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) =>
        onSubmit({
          title: values.title,
          company: values.company,
          location: values.location,
          type: values.type,
          salary: values.salary,
          description: values.description,
          requirements: values.requirementsText
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
        }),
      )}
    >
      <Input id="title" label="Job title" error={errors.title?.message} {...register('title')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="company" label="Company" error={errors.company?.message} {...register('company')} />
        <Input id="location" label="Location" error={errors.location?.message} {...register('location')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="type" label="Job type" error={errors.type?.message} {...register('type')}>
          {JOB_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Input id="salary" label="Salary" error={errors.salary?.message} {...register('salary')} />
      </div>
      <Textarea
        id="description"
        label="Description"
        rows={5}
        error={errors.description?.message}
        {...register('description')}
      />
      <Textarea
        id="requirementsText"
        label="Requirements"
        hint="One requirement per line"
        rows={4}
        error={errors.requirementsText?.message}
        {...register('requirementsText')}
      />
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
