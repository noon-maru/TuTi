interface WishPlace {
  _id: string;
  region: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  wishPlaceCount: number;
  tourismInfo: any;
  tags: tag[];
}
