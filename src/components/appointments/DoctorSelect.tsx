
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Doctor } from '@/lib/types';
import { Control } from 'react-hook-form';

interface DoctorSelectProps {
  doctors: Doctor[];
  control: Control<any>;
  disabled?: boolean;
}

export default function DoctorSelect({ doctors, control, disabled = false }: DoctorSelectProps) {
  return (
    <FormField
      control={control}
      name="doctorId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Doctor</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
