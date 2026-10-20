import { Controller, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import SkillInput from './SkillInput';

export default function PortfolioForm({ form, onSubmit }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const projects = useFieldArray({ control, name: 'projects' });
  const experience = useFieldArray({ control, name: 'experience' });

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Personal info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="fullName" label="Full name" error={errors.fullName?.message} {...register('fullName')} />
          <Input id="title" label="Headline" error={errors.title?.message} {...register('title')} />
          <Input
            id="username"
            label="Public username"
            hint="hirefolio.dev/portfolio/your-name"
            error={errors.username?.message}
            {...register('username')}
          />
          <Input id="email" label="Email" error={errors.email?.message} {...register('email')} />
          <Input id="location" label="Location" error={errors.location?.message} {...register('location')} />
        </div>
        <Textarea id="bio" label="Bio" rows={5} error={errors.bio?.message} {...register('bio')} />
      </section>

      <section>
        <Controller
          control={control}
          name="skills"
          render={({ field }) => (
            <SkillInput value={field.value} onChange={field.onChange} error={errors.skills?.message} />
          )}
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button
            type="button"
            size="sm"
            variant="subtle"
            onClick={() => projects.append({ title: '', description: '', link: '' })}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        {(errors.projects?.message || errors.projects?.root?.message) && (
          <p className="text-xs text-rose-600">
            {errors.projects.message || errors.projects.root.message}
          </p>
        )}
        {projects.fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => projects.remove(index)}
                className="text-slate-400 hover:text-rose-600"
                aria-label="Remove project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Input
              id={`project-title-${index}`}
              label="Title"
              error={errors.projects?.[index]?.title?.message}
              {...register(`projects.${index}.title`)}
            />
            <Textarea
              id={`project-desc-${index}`}
              label="Description"
              rows={3}
              error={errors.projects?.[index]?.description?.message}
              {...register(`projects.${index}.description`)}
            />
            <Input
              id={`project-link-${index}`}
              label="Link"
              placeholder="https://"
              error={errors.projects?.[index]?.link?.message}
              {...register(`projects.${index}.link`)}
            />
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Experience</h2>
          <Button
            type="button"
            size="sm"
            variant="subtle"
            onClick={() =>
              experience.append({ company: '', role: '', period: '', description: '' })
            }
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        {(errors.experience?.message || errors.experience?.root?.message) && (
          <p className="text-xs text-rose-600">
            {errors.experience.message || errors.experience.root.message}
          </p>
        )}
        {experience.fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => experience.remove(index)}
                className="text-slate-400 hover:text-rose-600"
                aria-label="Remove experience"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id={`exp-role-${index}`}
                label="Role"
                error={errors.experience?.[index]?.role?.message}
                {...register(`experience.${index}.role`)}
              />
              <Input
                id={`exp-company-${index}`}
                label="Company"
                error={errors.experience?.[index]?.company?.message}
                {...register(`experience.${index}.company`)}
              />
            </div>
            <Input
              id={`exp-period-${index}`}
              label="Dates"
              placeholder="2022 — Present"
              error={errors.experience?.[index]?.period?.message}
              {...register(`experience.${index}.period`)}
            />
            <Textarea
              id={`exp-desc-${index}`}
              label="Description"
              rows={3}
              error={errors.experience?.[index]?.description?.message}
              {...register(`experience.${index}.description`)}
            />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Social links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="github" label="GitHub" error={errors.socials?.github?.message} {...register('socials.github')} />
          <Input
            id="linkedin"
            label="LinkedIn"
            error={errors.socials?.linkedin?.message}
            {...register('socials.linkedin')}
          />
          <Input
            id="website"
            label="Website"
            error={errors.socials?.website?.message}
            {...register('socials.website')}
          />
          <Input
            id="twitter"
            label="Twitter / X"
            error={errors.socials?.twitter?.message}
            {...register('socials.twitter')}
          />
        </div>
      </section>

      <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
        Save portfolio
      </Button>
    </form>
  );
}
