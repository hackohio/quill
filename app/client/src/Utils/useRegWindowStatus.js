import axios from 'axios';
import { useEffect, useReducer } from 'React';

const SETTINGS_URL = '/api/settings/';

export default function useSettings(url) {
    const { settingMetaData, settingsFetchedPromise } = useFetch(SETTINGS_URL);

    return Date.now() > settings.timeOpen && Date.now() < settings.timeClose;
}