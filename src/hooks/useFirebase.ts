import {useContext} from 'react';
import {Context} from 'contexts/FirebaseProvider';

const useFirebase = () => {
  const {firebaseHelper} = useContext(Context);
  return firebaseHelper;
};

export default useFirebase;
