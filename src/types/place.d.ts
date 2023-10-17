interface Place {
  _id: string;
  region: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  numberHearts: number;
  tourismInfo: any;
  tags: tag[];
}
