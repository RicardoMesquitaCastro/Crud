import React, {useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Database from './Database';
import { Feather as Icon } from '@expo/vector-icons';

export default function AppForm({route,navigation}) {
    const id = route.params ? route.params.id : undefined;
//O objeto route ali possui uma propriedade params que justamente vai ter dentro dele o objeto que passamos com todos    
// os dados do item da lista que clicamos em Editar. Um destes valores, o id, eu vou armazenar diretamente em uma variável local. 
//Isso porque ele não é um dado que necessite ser exibido ao usuário.  
const [descricao, setDescricao] = useState(''); 
    const [quantidade, setQuantidade] = useState('');
    useEffect(() => {
        if(!route.params) return; // Vai ser disparado toda vez que o objeto route for modificado.
//A cada nova navegação realizada (ou seja, route com params diferentes), nós pegamos os parâmetros do route para setar o estado da descrição e da quantidade.        
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString());
      }, [route])

    function handleDescriptionChange(descricao){ setDescricao(descricao); } //edita a descrição do produto 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); } // edita a quantidade do produto 
    async function handleButtonPress(){  // função salvar os dados obtidos no nosso banco de dados. Lida com dados e navegação.
        const listItem = {descricao, quantidade: parseInt(quantidade)};
        Database.saveItem(listItem, id)
          .then(response => navigation.navigate("AppList", listItem)); // clicando no botão salvar navega para a listagem
      }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item para comprar</Text>
      <View style={styles.inputContainer}> 
        <TextInput 
        style={styles.input} 
        onChangeText={handleDescriptionChange} 
        placeholder="O que está faltando em casa?" 
        clearButtonMode="always"    // no iOS exibe um minúsculo botão para limpar o campo. Value referencia a váriavel de estado 
        value={descricao} />           
        <TextInput 
        style={styles.input} 
        onChangeText={handleQuantityChange} 
        placeholder="Digite a quantidade" 
        keyboardType={'numeric'} //keyboardType numérico para o campo quantidade
        clearButtonMode="always"
        value={quantidade.toString()} /> 
           <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
            <View style={styles.buttonContainer}>
                <Icon name="save" size={22} color="white" />
                <Text style={styles.buttonText}>Salvar</Text> 
            </View>
            </TouchableOpacity>
        </View>
        <StatusBar style="light" />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {      //é o estilo da tela como um todo. Aqui definimos cor de fundo e alinhamento geral;      
        flex: 1,
        backgroundColor: '#D93600',
        alignItems: 'center',
      },
      title: { //é o estilo do título da tela. Definimos cor da fonte, tamanho, peso e margem;
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
      },
      inputContainer: { //é o estilo do formulário como um todo. Definimos margem, largura, margem interna, arredondamento das bordas,
        flex: 1,        //cor de fundo e com ‘stretch’ dizemos que os inputs vão ocupar todo o espaço do formulário;
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
      },
      input: {  //é o estilo dos campos de texto. Definimos margem, altura, cor de fundo, arredondamento da borda, margem interna e tamanho da fonte;
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
      },
      button: { //é o estilo do botão. Definimos margem, cor de fundo, altura, arredondamento dos cantos, margem interna, tamanho da fonte, alinhamento e elevação/sombra (para dar profundidade);
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
      },
      buttonText: { // é o estilo do texto do botão. Apenas cor da fonte e peso aqui;
        color: '#fff',
        fontWeight: 'bold',
      },
      buttonContainer: {
        flexDirection: "row"
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      }
});