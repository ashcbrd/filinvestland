const API_URL = process.env.CMS_URL;

const apiService = {
  getHomeData: async () => {
    try {
      const pageResponse = await fetch(
        `${API_URL}/api/futura-pages/654c8980386037465bbbea82`,
        { cache: "no-store" },
      );
      const featuredResponse = await fetch(
        `${API_URL}/api/globals/futura-featured-projects`,
      );
      const featuredNewsResponse = await fetch(
        `${API_URL}/api/globals/futura-featured-news`,
      );
      console.log("dd", process.env.CMS_URL);
      const [page, featured, featuredNews] = await Promise.all([
        pageResponse.json(),
        featuredResponse.json(),
        featuredNewsResponse.json(),
      ]);

      return {
        page,
        featured,
        featured_news: featuredNews,
      };
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  },
};

export default apiService;
