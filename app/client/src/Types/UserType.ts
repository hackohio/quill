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
    essay: string;
    gender: string;
    ethnicity: string;
  };
  confirmation: {
    phoneNumber: string;
    discordUsername: string;
    dietaryRestrictions: Array<string>;
    shirtSize: string;
    github: string;
    website: string;
    resume: boolean;
    cannotPickupMaterials: boolean;
    interestedInEmployment: boolean;
    intrestedInJoiningOrg: boolean;
    legalName: boolean;
    notes: string;
    signatureLiability: string;
    signatureCodeOfConduct: string;
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
