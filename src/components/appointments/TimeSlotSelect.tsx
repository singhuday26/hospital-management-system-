
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';

interface TimeSlotSelectProps {
  control: Control<any>;
  availableTimeSlots: string[];
  isDisabled: boolean;
  hasSelectedDoctor: boolean;
  hasSelectedDate: boolean;
}

export default function TimeSlotSelect({ 
  control, 
  availableTimeSlots, 
  isDisabled, 
  hasSelectedDoctor, 
  hasSelectedDate 
}: TimeSlotSelectProps) {
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <Select
            disabled={isDisabled || !hasSelectedDate || !hasSelectedDoctor || availableTimeSlots.length === 0}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={
                  !hasSelectedDate || !hasSelectedDoctor 
                    ? "Select date and doctor first"
                    : availableTimeSlots.length === 0
                    ? "No available slots"
                    : "Select a time"
                } />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableTimeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time.substring(0, 5)}
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
