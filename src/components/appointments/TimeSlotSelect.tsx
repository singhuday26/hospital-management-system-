
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

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
  const isLoadingSlots = hasSelectedDoctor && hasSelectedDate && availableTimeSlots.length === 0;
  
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <Select
            disabled={isDisabled || !hasSelectedDate || !hasSelectedDoctor}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="flex justify-between items-center">
                <SelectValue placeholder={
                  !hasSelectedDate || !hasSelectedDoctor 
                    ? "Select date and doctor first"
                    : isLoadingSlots
                    ? "Loading available slots..."
                    : availableTimeSlots.length === 0
                    ? "No available slots"
                    : "Select a time"
                } />
                {isLoadingSlots && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableTimeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time.substring(0, 5)}
                </SelectItem>
              ))}
              {availableTimeSlots.length === 0 && hasSelectedDate && hasSelectedDoctor && (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  No available slots for selected date
                </div>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
