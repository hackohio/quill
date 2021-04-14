export type User = {
  _id: string;
  email: string;
  admin: boolean;
  lastUpdated: number;
  teamCode: string;
  verified: boolean;
  profile: {
    name: string;
    adult: boolean;
    school: string;
    major: string;
    graduationMonth: string;
    graduationYear: string;
    degree: string;
    description: string;
    essay: string;
    gender: string;
    ethnicity: string;
  };
  confirmation: {
    phoneNumber: string;
    dietaryRestrictions: Array<string>;
    shirtSize: string;
    intrestedInJoiningOrg: boolean;
    interestedInEmployment: boolean;
    signatureLiability: string;
    signatureCodeOfConduct: string;
    notes: string;
  };
  status: {
    completedProfile: boolean;
    admitted: boolean;
    admittedBy: string;
    confirmed: boolean;
    declined: boolean;
    checkedIn: boolean;
    checkInTime: number;
    confirmBy: number;
  };
};
