interface Course {
  _id: string;
  courseName: string;
  places: Place[];
  travelTime: number[];
  totalFee: number;
  startDate: string;
  recordImages: string[];
  isProgress: boolean;
  isTermination: boolean;
  isRecommended: boolean;
}
