
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date object into a readable string
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date provided to formatDate:', date);
    return 'Invalid date';
  }
  
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats a time string to a more readable format
 */
export function formatTime(timeString: string): string {
  try {
    // Handle format like "09:30:00"
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return timeString;
    }
    
    let period = 'AM';
    let hour = hours;
    
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hour = hours - 12;
      }
    }
    
    if (hour === 0) {
      hour = 12;
    }
    
    return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
}
