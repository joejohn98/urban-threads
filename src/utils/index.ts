import { Address } from "../types";

export const generateRandomAddress = (): Omit<Address, "id"> => {
  const streets = [
    "42/A, MG Road",
    "15, Park Street",
    "78/B, Gandhi Nagar",
    "23, Civil Lines",
    "56, Jubilee Hills",
    "89/C, Koramangala",
    "34, HSR Layout",
  ];
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
  ];
  const states = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Telangana",
    "West Bengal",
    "Maharashtra",
  ];
  const pinCodes = [
    "400001",
    "110001",
    "560001",
    "600001",
    "500001",
    "700001",
    "411001",
  ];
  const phoneNumbers = [
    "9876543210",
    "9876543211",
    "9876543212",
    "9876543213",
    "9876543214",
    "9876543215",
    "9876543216",
  ];
  const fullNames = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
    "Diana Green",
    "Edward White",
  ];

  const randomIndex = Math.floor(Math.random() * streets.length);

  return {
    fullName: fullNames[randomIndex],
    street: streets[randomIndex],
    city: cities[randomIndex],
    state: states[randomIndex],
    zipCode: pinCodes[randomIndex],
    phone: phoneNumbers[randomIndex],
    country: "India",
    isDefault: false,
  };
};
