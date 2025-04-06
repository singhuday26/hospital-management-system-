
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';

interface NotesFieldProps {
  control: Control<any>;
  disabled?: boolean;
}

export default function NotesField({ control, disabled = false }: NotesFieldProps) {
  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem className="col-span-1 md:col-span-2">
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Add any additional notes about this appointment"
              className="resize-none"
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
