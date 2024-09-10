class Config {
  public config: {
    API_URL: string | undefined;
    JOB_REFRESH_RATE: number | undefined;
    ROUND_PLACES: number | undefined;
  };

  constructor() {
    this.config = {
      API_URL: import.meta.env.VITE_API_BASE_URL,
      JOB_REFRESH_RATE: parseInt(import.meta.env.VITE_JOB_REFRESH_RATE),
      ROUND_PLACES: parseInt(import.meta.env.VITE_ROUND_PLACES),
    };
  }

  get(key: keyof typeof this.config) {
    return this.config[key];
  }
}

export default Config;
