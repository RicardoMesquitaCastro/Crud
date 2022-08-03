import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import AppItem from './AppItem';
import Database from './Database';

 
export default function AppList({route,navigation}) {
    const [items, setItems] = useState([]);
  
  useEffect(() => { //rá ser disparado toda vez que a variável route seja alterada, ou seja, toda vez que entrar nesta tela vindo de outra.
      Database.getItems().then(items => setItems(items)); //
  }, [route]);                                              //CRUD = R
  return (
    <View style={styles.container}>
    <StatusBar style="light" />
    <Text style={styles.title}>Lista de Compras</Text>
    <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}>
        { items.map(item => { //passando propriedades dos intens do array armazenado no estado
            return <AppItem key={item.id} id={item.id} item={item.quantidade + '  de ' + item.descricao} navigation={navigation} />
        }) }
    </ScrollView>
</View>
);
}
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D93600',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
      marginBottom: 20
    },
    scrollContainer: {
      flex: 1,
      width: '90%'
    },
    itemsContainer: {
      flex: 1,
      marginTop: 10,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
  });