/**
 * Video data for the application
 */
export const videos = [
  {
    id: 1,
    videoId: "osD0RAxQsbE"
  },
  {
    id: 2,
    videoId: "OHqcNAyqV2A"
  },
  {
    id: 3,
    videoId: "osD0RAxQsbE"
  },
  {
    id: 4,
    videoId: "OHqcNAyqV2A"
  },
  {
    id: 5,
    videoId: "osD0RAxQsbE"
  },
  {
    id: 6,
    videoId: "OHqcNAyqV2A"
  },
  {
    id: 7,
    videoId: "osD0RAxQsbE"
  },
  {
    id: 8,
    videoId: "OHqcNAyqV2A"
  },
  {
    id: 9,
    videoId: "osD0RAxQsbE"
  },
  {
    id: 10,
    videoId: "OHqcNAyqV2A"
  }
];

/**
 * Function to get a subset of videos
 * @param {number} limit - Number of videos to return
 * @returns Array of videos limited by the specified count
 */
export const getVideos = (limit = 5) => {
  return videos.slice(0, limit);
};

/**
 * Function to get video by ID
 * @param {number} id - Video ID
 * @returns Video object or undefined if not found
 */
export const getVideoById = (id) => {
  return videos.find(video => video.id === id);
}; 