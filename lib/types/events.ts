export interface EventDetails {
  id: number;
  organisation: {
    id: number;
    name: string;
    description: string;
    location: string;
  };
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  category: string;
  tags: string[];
  type: string;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  created_by: {
    id: number;
    email: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
