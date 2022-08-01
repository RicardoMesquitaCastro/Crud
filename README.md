
Este projeto contempla um aplicativo focado em criar as funcionalidades do CRUD. A finalidade dele é adicionar itens e quantidade, salvando-o em um banco de dados local. Sendo também posivel alterar os dados e também sua exclusão. O front-end da aplicação é bem básico, pois, o intuito do projeto é focar na manipulação dos dados. Logo a seguir serão descritos os passos realizados. E também na parte dos códigos da aplicação é comentado a lógica utilizada.

#1 - Setup do projeto
    Projeto criado utilizando o expo-cli;
    > expo init crud

#2 – Criando a navegação
    A aplicação terá duas telas: Listagem e Cadastro. Para navegar entre elas foi criado um menu inferior na tela;
    BIBLIOTECAS DE NAVEGAÇÃO:
    > npm install @react-navigation/native
    > expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
    >npm install @react-navigation/bottom-tabs

    Após a instalação das bibliotecas de navegação foi criado dois aquivos chamados AppForm.js e AppList.js, das quais são as páginas renderizadas do aplicativo.
    Também foi criado o arquivo AppTab.js, que garatirá a navegação entre as duas telas.

    Na tela inicial o (App.js) foi editado para que ele chame o arquivo de navegação AppTab, gerando a barra inferior de navegação. 

#3 - Criando o formulário
    * No AppForm.js os dois inputs servirão para coletar a descrição do item que deve ser comprado e a quantidade do mesmo. 
    * Foi adicionado um keyboardType numérico para o campo quantidade, bem como adicionei o clearButtonMode que exibe um botão para limpar o campo.   

#4 - Estados do Formuário (CRUD)
    * Primeiro, é preciso importar a função useState do React , isso no AppForm.js. Após criar os objetos de estado e as funções de manipulação do estado, dentro da function AppForm.
    * Foi criada uma function para manipular o ‘press’ do botão, que por enquanto apenas imprime no console um objeto JSON com os dados obtidos e um ID. Essa função também joga o usuário de volta para a aba de listagem, o que será muito útil mais tarde.
    * As funções foram incluídas nas propriedades onChangeText dos inputs e onPress do botão para a manipulação de estado.

#5 - Salvando no banco de dados (Async). ESTE PASSO É O C do CRUD.
    Biblioteca necessária:    > expo install @react-native-async-storage/async-storage
   * AsyncStorage é uma forma bem simples para armazenar dados locais baseado em chave-valor, onde o valor é sempre textual. Sendo sempre textual, o mais comum é a gente salvar objetos JSON em forma de texto, o que chamamos geralmente de objeto “serializado”.
   * Ele será importado no AppForm.js, na função handleButtonPress, será usada para salvar os dados obtidos no nosso banco de dados. 
   * 

#6 - Criando a listagem
    * Neste passo foi criado a página AppItem.js, que será uma listagem dos itens. Ela irá receber um objeto props que conterá o texto do item a ser adicionado na listagem. Além do texto, temos dois botões, um de editar o item e outro de excluir.
    * Neste passo foi criado o arquivo Database.js, que receberá toda a lõgica de acesso a dados do CRUD.
    * Criada o item da lista, o proximo passo foi a lista em si, representada no módulo AppList.js. Na função default desta tela um estado para o array de itens que futuramente virão do banco de dados.  Este passo é adicionado no módulo Database.js como "saveItem"

#7 - Retornando os itens do banco. ESTE PASSO É O R do CRUD. 
    
    * Chegado ao passo de mais uma letra do CRUD, o R. Ele retornará os dados salvos pela tela de cadastro e apresenta-la na lista, sendo quando abrir o aplicativo pela prineira vez, quanto para um dado cadastrado, atualizado ou excluído. Este passo é adicionado no módulo Database.js como "getItems".

#8 - Selecionando um item. ESTE PASSO É O U do CRUD.
    * Foi feito a criação das funções em Database.js para o botão de Editar e Salvar. O passo consiste em enviar o usuário para a tela de cadastro, já com os campos preenchidos, para que quando for realizada a alteração e clicar em salvar, o registro será atualizado após clicar em salvar. Este passo é adicionado no módulo Database.js como "getItem". 
    * Nesta etapa foi necessário mais alguns passos, descritos também como comentários dirante o código.

#9 - Excluindo um item. ESTE PASSO É O D do CRUD.
    * Este passo começa em definir uma função que exclui o registro com determinado id no Async Storage, que será aplicado no obtão de exclusão dentrode Compras. Mas antes disso será exibido um popup de confirmação, questionando o usuário da certeza de excluir o dado.
* Criação da função de exclusão é feita no Database.js e adicionada também no module.exports como, "deleteItem".     
    

