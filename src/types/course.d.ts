interface Course {
  _id: string;
  courseName: string;
  places: Place[];
  travelTime: number[];
  totalFee: number;
  recordImages: string[];
  isProgress: boolean;
  isTermination: boolean;
  isRecommended: boolean;
}
