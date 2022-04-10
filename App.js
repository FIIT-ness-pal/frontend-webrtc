
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './config/custom-theme.json';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <AppNavigator />
    </ApplicationProvider>
  
  );
}
