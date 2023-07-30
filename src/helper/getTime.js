export default function formatDate(timestamp) {
    // Create a new Date object from the timestamp
    const dateObj = new Date(timestamp);
  
    // Get the individual date components
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
  
    // Pad the day and month with leading zeros if necessary
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
  
    // Format the date as dd-mm-yyyy
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  
    return formattedDate;
  }
  
  