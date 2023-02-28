export interface IPartner {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  image: string;
  city: {
    name: string;
  };
  address: string;
  phone: string;
  desc: string;
  latitude: string;
  longitude: string;
  days: [
    {
      id: number;
      name: string;
      pivot: {
        day_id: number;
        from_hours: string;
        from_minutes: string;
        to_hours: string;
        to_minutes: string;
      };
      openToday: boolean;
    },
  ];
  isOpen: boolean;
}
