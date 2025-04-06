
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/lib/types';
import { Control } from 'react-hook-form';

interface PatientSelectProps {
  patients: Patient[];
  control: Control<any>;
  disabled?: boolean;
}

export default function PatientSelect({ patients, control, disabled = false }: PatientSelectProps) {
  return (
    <FormField
      control={control}
      name="patientId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Patient</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name}
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
