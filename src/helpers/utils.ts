import api from "../axios";

export const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift(); 
    }
    return undefined; 
  };
  

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name: string) => {
  // Check if the name contains a space (e.g., full name) or just a single word (e.g., email)
  const nameParts = name.split(' ');
  
  // If there's no space (like an email), fallback to using the first letter of the whole string
  const firstLetter = nameParts[0][0]; 
  const secondLetter = nameParts.length > 1 ? nameParts[1][0] : ''; // Only use second letter if it exists
  
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstLetter}${secondLetter}`, // Combine first and second letter or just the first
  };
};