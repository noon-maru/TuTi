import axios, { AxiosResponse } from "axios";

import { KAKAO_REST_API_KEY } from "@env";

const getTrafficReport = async (points: Coordinate[]) => {
  try {
    // 자동차 길찾기 URL
    const carDirectionsURL =
      "https://apis-navi.kakaomobility.com/v1/directions";
    // 다중 경유지 길찾기 URL
    const waypointsURL =
      "https://apis-navi.kakaomobility.com/v1/waypoints/directions";

    const jsonData: { [key: string]: any } = {
      priority: "RECOMMEND",
      car_fuel: "GASOLINE",
      car_hipass: false,
      alternatives: false,
      road_details: false,
    };

    if (points.length === 2) {
      jsonData.origin = `${points[0].x},${points[0].y}`;
      jsonData.destination = `${points[points.length - 1].x},${
        points[points.length - 1].y
      }`;

      const response: AxiosResponse = await axios.get(carDirectionsURL, {
        params: jsonData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      return response.data;
    } else {
      jsonData.origin = {
        x: points[0].x,
        y: points[0].y,
      };

      jsonData.destination = {
        x: points[points.length - 1].x,
        y: points[points.length - 1].y,
      };

      jsonData.waypoints = points.slice(1, -1);

      const response: AxiosResponse = await axios.post(
        waypointsURL,
        JSON.stringify(jsonData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    console.error("네트워킹 오류:", error);
  }
};

const getTravelTime = async (points: Coordinate[]) => {
  const trafficReport = await getTrafficReport(points);

  if (trafficReport.routes[0].result_code === 0)
    return trafficReport.routes[0].sections.map(
      // duration이 초 단위로 오기 때문에 분 단위로 절삭 후 반올림
      (section: { duration: number }) => Math.round(section.duration / 60)
    );
  else {
    return [
      trafficReport.routes[0].result_code,
      trafficReport.routes[0].result_msg,
    ];
  }
};

export default getTravelTime;
