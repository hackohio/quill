import useFetch, { STATUS } from '../Utils/useFetch';
import { Stats } from '../Types/StatsType';

const statsURL = '/api/stats';
/**
 * Hook that returns current stats data.
 * Returns null while loading
 */
export default function useStats(): Stats | null {
  const statsData = useFetch(statsURL);
  console.log(statsData.status);
  console.log(statsData.data);
  if (statsData.status != STATUS.FETCHED) {
    return null;
  }

  return statsData.data as Stats;
}
