export default interface IAsteroid {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: [
    {
      close_approach_date: string;
      close_approach_date_full: string;
      relative_velocity: {
        kilometers_per_second: string;
        kilometers_per_hour: string;
      };
      miss_distance: {
        lunar: number;
        kilometers: number;
      };
      orbiting_body: string;
    }
  ];
}
