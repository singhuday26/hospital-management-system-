
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';

interface AppointmentTypeSelectProps {
  control: Control<any>;
  disabled?: boolean;
}

export default function AppointmentTypeSelect({ control, disabled = false }: AppointmentTypeSelectProps) {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Appointment Type</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Checkup">Checkup</SelectItem>
              <SelectItem value="Consultation">Consultation</SelectItem>
              <SelectItem value="Surgery">Surgery</SelectItem>
              <SelectItem value="Follow-up">Follow-up</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
