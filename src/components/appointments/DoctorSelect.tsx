
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Doctor } from '@/lib/types';
import { Control } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface DoctorSelectProps {
  doctors: Doctor[];
  control: Control<any>;
  disabled?: boolean;
  isLoading?: boolean;
}

function DoctorSelect({ doctors, control, disabled = false, isLoading = false }: DoctorSelectProps) {
  return (
    <FormField
      control={control}
      name="doctorId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Doctor</FormLabel>
          <Select
            disabled={disabled || isLoading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="flex justify-between items-center">
                <SelectValue placeholder={isLoading ? "Loading doctors..." : "Select a doctor"} />
                {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!isLoading && doctors.length === 0 && (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  No doctors found
                </div>
              )}
              {isLoading ? (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  Loading doctors...
                </div>
              ) : (
                doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))
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
export default memo(DoctorSelect);
