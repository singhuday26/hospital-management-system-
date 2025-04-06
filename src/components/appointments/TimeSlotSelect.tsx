
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface TimeSlotSelectProps {
  control: Control<any>;
  availableTimeSlots: string[];
  isDisabled: boolean;
  hasSelectedDoctor: boolean;
  hasSelectedDate: boolean;
  isLoading?: boolean;
}

function TimeSlotSelect({ 
  control, 
  availableTimeSlots, 
  isDisabled, 
  hasSelectedDoctor, 
  hasSelectedDate,
  isLoading = false 
}: TimeSlotSelectProps) {
  const showLoadingIndicator = hasSelectedDoctor && hasSelectedDate && isLoading;
  const showNoSlotsMessage = hasSelectedDoctor && hasSelectedDate && !isLoading && availableTimeSlots.length === 0;
  
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <Select
            disabled={isDisabled || !hasSelectedDate || !hasSelectedDoctor || isLoading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="flex justify-between items-center">
                <SelectValue placeholder={
                  !hasSelectedDate || !hasSelectedDoctor 
                    ? "Select date and doctor first"
                    : showLoadingIndicator
                    ? "Loading available slots..."
                    : showNoSlotsMessage
                    ? "No available slots"
                    : "Select a time"
                } />
                {showLoadingIndicator && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time.substring(0, 5)}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  {showLoadingIndicator 
                    ? "Loading available slots..." 
                    : showNoSlotsMessage
                    ? "No available slots for selected date"
                    : "Select date and doctor first"}
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

// Memoize component to prevent unnecessary re-renders
export default memo(TimeSlotSelect);
