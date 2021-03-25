import useFetch, { STATUS } from './useFetch';

const SETTINGS_URL = '/api/settings/';

/**
 * Hook that returns the confirmation time for the current user
 * Returns null when still loading data or if the user has no confirmation
 * deadline, returns the deadline if it has been set.
 */
export default function useApplicationCloseTime(): Date {
  const publicSettings = useFetch(SETTINGS_URL);

  if (publicSettings.status != STATUS.FETCHED) {
    return null;
  }
  const settings = publicSettings.data;
  return new Date(settings.timeClose);
}
