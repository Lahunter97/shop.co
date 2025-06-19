import { useState, useEffect } from 'react';
import router from '../router';

export function useParams() {
  const [params, setParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Функция-обработчик, которая вызывается при смене маршрута
    const onRouteMatch = (match: any) => {
      setParams(match?.params || {});
    };

    // Подписываемся на событие match
    router.on('*', onRouteMatch).resolve();

    // Очистка подписки при размонтировании
    return () => {
      router.off('*', onRouteMatch);
    };
  }, []);

  return params;
}
