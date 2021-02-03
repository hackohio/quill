import useFetch, { STATUS } from "./useFetch";

const SETTINGS_URL = "/api/settings/";

/**
 * Hook that returns if the registration window is open.
 * Returns null when still loading data, return true if data has been loaded and
 * the registration period is open, returns false if the data has been loaded
 * and the registration period is closed.
 */
export default function useRegWindowStatus(): boolean {
  const publicSettings = useFetch(SETTINGS_URL);
  if (publicSettings.status != STATUS.FETCHED) {
    return null;
  }
  const settings = publicSettings.data;
  return Date.now() > settings.timeOpen && Date.now() < settings.timeClose;
}
