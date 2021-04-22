import useFetch, { STATUS } from '../Utils/useFetch';
import { Stats } from '../Types/StatsType';

const statsURL = '/api/users/stats';
/**
 * Hook that returns current stats data.
 * Returns null while loading
 */
export default function useStats(): Stats | null {
  const statsData = useFetch(statsURL);
  if (statsData.status != STATUS.FETCHED) {
    console.log('no stats');
    return null;
  }
  return statsData.data as Stats;
}
