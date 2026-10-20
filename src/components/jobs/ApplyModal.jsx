import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../ui/Modal';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { applySchema } from '../../utils/validation';

export default function ApplyModal({ open, job, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(applySchema),
    defaultValues: { coverLetter: '' },
  });

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} title={`Apply to ${job?.title || 'this role'}`} onClose={close}>
      <p className="mb-4 text-sm text-slate-500">
        Share a short cover letter. Employers on Hirefolio read these before they open your portfolio.
      </p>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values.coverLetter);
          reset();
        })}
      >
        <Textarea
          id="coverLetter"
          label="Cover letter"
          rows={7}
          placeholder="Why this role, and what you would ship in the first 90 days..."
          error={errors.coverLetter?.message}
          {...register('coverLetter')}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Submit application
          </Button>
        </div>
      </form>
    </Modal>
  );
}
