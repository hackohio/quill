import useFetch, { STATUS } from '../Utils/useFetch';
import { Stats } from '../Types/StatsType';

function fetchStats() {
  const statsData = useFetch('/api/users/stats');
  if (statsData.status != STATUS.FETCHED) {
    return null;
  }
  return statsData.data as Stats;
}
