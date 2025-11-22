import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { CadastroUsuarioView } from './view/CadastroUsuarioView';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from './view/LoginView';
import { useAppControl } from './control/appControl';
import { ContextoPrincipal } from './contexto/contextoPrincipal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles, cores } from './estilos/estilos';
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PerfilView } from './view/PerfilView';
import { CheckinView } from './view/CheckinView';
import AnaliseView from './view/AnaliseView';
import { SobreAppView } from './view/SobreAppView';
import { LeiturasView } from './view/Leituras';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

    const {token, emailProfile, idUsuario, setProfile, loading, tokenTela, clearProfile} = useAppControl();
  
    if (loading) { 
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={cores.rosaEscuro} />
          <Text style={{ marginTop: 10, fontSize: 16 }}>Carregando...</Text>
        </View>
      );
    }
      
    return (
      <ContextoPrincipal.Provider value={{
        token: token??undefined, emailProfile, idUsuario: idUsuario??undefined, setProfile, clearProfile
      }}>
        <NavigationContainer>
          <View style={[styles.container, { flex: 1 }]}>

            {(tokenTela) ? (
              //Usuario Logado
              <Tab.Navigator 
                initialRouteName="Checkin"
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: cores.rosaEscuro,
                  tabBarInactiveTintColor: cores.texto,
                  tabBarStyle: {
                    backgroundColor: cores.rosaClaro3,
                    borderTopColor: cores.rosaClaro2,
                    borderTopWidth: 1,
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                  },
                  headerStyle: {
                    backgroundColor: cores.amareloClaro2,
                  },
                  headerTintColor: cores.textoEscuro,
                }}
              >
                  <Tab.Screen 
                    name="Perfil do Usuário" 
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <Feather name="user" size={24} color={color} />
                    }} 
                    component={PerfilView}
                  />
                  <Tab.Screen 
                    name="Checkin"
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <Feather name="check-circle" size={24} color={color} />
                    }}
                    component={CheckinView}
                  />
                  <Tab.Screen 
                    name="Análise Semanal" 
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <MaterialIcons name="analytics" size={24} color={color} />
                    }}
                    component={AnaliseView}
                  />
                  <Tab.Screen 
                    name="Leituras" 
                    component={LeiturasView}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <Feather name="book-open" size={24} color={color} />
                    }}
                  />
                  <Tab.Screen 
                    name="SobreApp" 
                    component={SobreAppView}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({size, color}) => 
                        <Feather name="info" size={24} color={color} />
                    }}
                  />
              </Tab.Navigator>
            ) : (
                <Stack.Navigator
                  screenOptions={{
                    headerShown: true,
                    gestureEnabled: true,
                    headerStyle: {
                      backgroundColor: cores.amareloClaro2,
                    },
                    headerTintColor: cores.textoEscuro,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <Stack.Screen 
                    name="Login" 
                    component={LoginView} 
                    options={{ 
                      title: 'MENTALANCE',
                      headerTitleAlign: 'center'
                    }}
                  />
                  <Stack.Screen 
                    name="UsuarioCadastro" 
                    component={CadastroUsuarioView}
                    options={{ title: 'Cadastro de Usuário' }}
                  />
                  <Stack.Screen name="SobreApp" component={SobreAppView}/>

              </Stack.Navigator>
            )}


          </View>
        </NavigationContainer>
      </ContextoPrincipal.Provider>
    );
}