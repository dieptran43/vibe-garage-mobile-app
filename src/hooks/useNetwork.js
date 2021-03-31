import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    handleNetworkCheck();
  }, [isConnected]);

  useEffect(() => {
    handleNetworkListeners();
  }, []);

  const handleNetworkCheck = async () => {
    const network = await NetInfo.fetch();
    const isConnected = network.isConnected;
    setIsConnected(isConnected);
  };

  const handleNetworkListeners = () => {
    NetInfo.addEventListener((network) => {
      const isConnected = network?.isConnected;
      setIsConnected(isConnected);
    });
  };

  return [isConnected, setIsConnected];
};
