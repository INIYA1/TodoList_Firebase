import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';


const Stack = createStackNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name = 'Home' component={Home} />
                <Stack.Screen name = 'Details' component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}