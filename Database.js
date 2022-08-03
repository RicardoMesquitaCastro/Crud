import AsyncStorage from '@react-native-async-storage/async-storage';
 
async function saveItem(listItem, id){
    listItem.id = id ? id : new Date().getTime()
    const savedItems = await getItems();
 
    if(id){
        const index = await savedItems.findIndex(item => item.id === id);
        savedItems[index] = listItem;
    }
    else
      savedItems.push(listItem);
 
    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}
function getItems(){ //pega todos os itens do AsyncStorage e retorna em forma de array através de uma promise.
    return AsyncStorage.getItem('items') //adicionada no module.exports
            .then(response => {
                if(response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
}
async function getItem(id){
    const savedItems = await getItems();
    return savedItems.find(item => item.id === id);
}
async function deleteItem(id){
    let savedItems = await getItems();
    const index = await savedItems.findIndex(item => item.id === id);
    savedItems.splice(index, 1);
    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}
 
module.exports = {
    saveItem,  //C
    getItems,  //R
    getItem,   //U  
    deleteItem //D
}