export type UserDetails = {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  location: string;
  latitude: number;
  longitude: number;
  mobile_no: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
};

export type OrganisationDetails = {
  id: number;
  name: string;
  description: string;
  email: string;
  tags: string[];
  location: string;
  created_at: string;
  updated_at: string;
};
