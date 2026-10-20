import { Search } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { JOB_TYPES } from '../../utils/helpers';

export default function JobFilters({ query, location, type, onQuery, onLocation, onType }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div className="relative sm:col-span-2 lg:col-span-1">
        <Search className="pointer-events-none absolute left-3 top-[2.35rem] h-4 w-4 text-slate-400" />
        <Input
          id="search"
          label="Search"
          placeholder="Title or company"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          className="pl-9"
        />
      </div>
      <Input
        id="location"
        label="Location"
        placeholder="City or remote"
        value={location}
        onChange={(event) => onLocation(event.target.value)}
      />
      <Select id="type" label="Job type" value={type} onChange={(event) => onType(event.target.value)}>
        <option value="">All types</option>
        {JOB_TYPES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </div>
  );
}
