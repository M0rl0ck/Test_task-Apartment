export default interface IAsteroidApproach {
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
      miss_distance: {
        lunar: number;
        kilometers: number;
      };
    }
  ];
}
