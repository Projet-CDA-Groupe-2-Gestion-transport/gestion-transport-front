export interface AddressApiResponse{
  display_name: string;
  lat: number;
  lon: number;
  type: string;
  importance: number;
  place_id: string;
  osm_id: string;
  osm_type: string;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    village?: string;
  };
  boundingbox?: string[];
}
