// validators.ts

export function validateName(name: string): boolean {
  if (!name || name.trim() === "") return false;
  if (name.length < 2) return false;
  return true;
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;
  return true;
}

export function validatePassword(password: string): boolean {
  if (!password) return false;
  if (password.length < 8) return false;
  return true;
}

export function validateDob(dob: string): boolean {
  if (!dob) return false;
  const date = new Date(dob);
  if (isNaN(date.getTime())) return false;
  if (date > new Date()) return false;
  return true;
}

export function validateGender(gender: string): boolean {
  if (!gender) return false;
  return true;
}
export function validateBp(bp: string): string {
  if (!bp || bp.trim() === "") return "Blood pressure is required";

  const regex = /^(\d{2,3})\/(\d{2,3})$/;
  const match = bp.match(regex);

  if (!match) return "Blood pressure must be in format systolic/diastolic (e.g. 120/80)";

  const systolic = parseInt(match[1], 10);
  const diastolic = parseInt(match[2], 10);

  if (systolic < 70 || systolic > 250) return "Systolic value out of range (70–250)";
  if (diastolic < 40 || diastolic > 150) return "Diastolic value out of range (40–150)";

  return "";
}

export function validateHeartRate(hr: string): string {
  if (!hr || hr.trim() === "") return "Heart rate is required";

  const value = Number(hr);
  if (isNaN(value)) return "Heart rate must be a number";
  if (value < 40 || value > 200) return "Heart rate out of range (40–200 bpm)";

  return "";
}

export function validateSugar(sugar: string): string {
  if (!sugar || sugar.trim() === "") return "Sugar level is required";

  const value = Number(sugar);
  if (isNaN(value)) return "Sugar level must be a number";
  if (value < 50 || value > 400) return "Sugar level out of range (50–400 mg/dL)";

  return "";
}

export function validateWeight(weight: string): string {
  if (!weight || weight.trim() === "") return "Weight is required";

  const value = Number(weight);
  if (isNaN(value)) return "Weight must be a number";
  if (value < 1 || value > 500) return "Weight out of range (1–500 kg)";

  return "";
}
export function validateCholesterol(cholesterol: string): string {
  if (!cholesterol || cholesterol.trim() === "") return "Cholesterol level is required";

  const value = Number(cholesterol);
  if (isNaN(value)) return "Cholesterol level must be a number";
  if (value < 100 || value > 400) return "Cholesterol level out of range (100–400 mg/dL)";

  return "";
}

