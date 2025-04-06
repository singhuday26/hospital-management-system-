
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/lib/types';
import { Control } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface PatientSelectProps {
  patients: Patient[];
  control: Control<any>;
  disabled?: boolean;
  isLoading?: boolean;
}

function PatientSelect({ patients, control, disabled = false, isLoading = false }: PatientSelectProps) {
  return (
    <FormField
      control={control}
      name="patientId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Patient</FormLabel>
          <Select
            disabled={disabled || isLoading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="flex justify-between items-center">
                <SelectValue placeholder={isLoading ? "Loading patients..." : "Select a patient"} />
                {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!isLoading && patients.length === 0 && (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  No patients found
                </div>
              )}
              {isLoading ? (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  Loading patients...
                </div>
              ) : (
                patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
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
export default memo(PatientSelect);
