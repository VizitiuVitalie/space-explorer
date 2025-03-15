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
  solOrEarth: number | string, // can be number for sol or string for earth date
  searchMode: "sol" | "earth",
  camera?: string,
  page?: number
): Promise<MarsRoverPhoto[]> => {
  try {
    const timestamp = Date.now();
    let url = "";
    if (searchMode === "sol") {
      url = `${MARS_ROVER_BASE_URL}/rovers/${rover}/photos?sol=${solOrEarth}&api_key=${NASA_API_KEY}&t=${timestamp}`;
    } else {
      url = `${MARS_ROVER_BASE_URL}/rovers/${rover}/photos?earth_date=${solOrEarth}&api_key=${NASA_API_KEY}&t=${timestamp}`;
    }
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

export const fetchMaxSol = async (rover: string): Promise<number> => {
  try {
    const response = await fetch(
      `${MARS_ROVER_BASE_URL}/manifests/${rover}?api_key=${NASA_API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch max sol");
    const data = await response.json();
    return data.photo_manifest.max_sol;
  } catch (error) {
    console.error("fetchMaxSol error:", error);
    throw error;
  }
};