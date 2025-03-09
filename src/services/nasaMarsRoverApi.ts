import { NASA_API_KEY, MARS_ROVER_BASE_URL } from "../config/config";

export interface MarsRoverPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: {
    name: string;
    full_name: string;
  };
  rover: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export const fetchMarsRoverPhotos = async (
  rover: string,
  sol: number,
  camera?: string
): Promise<MarsRoverPhoto[]> => {
  try {
    let url = `${MARS_ROVER_BASE_URL}/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}&t=${Date.now()}`;
    if (camera) {
      url += `&camera=${camera}`;
    }

    const response = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Unexpected response format (not JSON)");
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error("fetchMarsRoverPhotos error:", error);
    throw error;
  }
};
