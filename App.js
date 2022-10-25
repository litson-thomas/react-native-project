import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './components/common/header';
import Search from './components/common/search';
import { lightColors } from './theme/colors';
import { fontFiles } from './theme/fonts';

export default function App() {

  // fonts loading
  const [fontsLoaded] = useFonts(fontFiles);
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Header></Header>
        <Search></Search>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.background,
    height: '100%',
    padding: 20,
  },
});
