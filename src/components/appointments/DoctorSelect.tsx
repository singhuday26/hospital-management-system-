
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Doctor } from '@/lib/types';
import { Control } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface DoctorSelectProps {
  doctors: Doctor[];
  control: Control<any>;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function DoctorSelect({ doctors, control, disabled = false, isLoading = false }: DoctorSelectProps) {
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
          >
            <FormControl>
              <SelectTrigger className="flex justify-between items-center">
                <SelectValue placeholder={isLoading ? "Loading doctors..." : "Select a doctor"} />
                {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {doctors.length > 0 ? doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </SelectItem>
              )) : (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  {isLoading ? "Loading doctors..." : "No doctors found"}
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
