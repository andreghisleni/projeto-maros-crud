import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid'

async function saveItem(listItem, id) {
  listItem.id = id ? id : uuid();
  const savedItems = await getItems();
  if (id) {
    const index = await savedItems.findIndex((item) => item.id === id);
    savedItems[index] = listItem;
  } else savedItems.push(listItem);

  return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

async function getItems() {
  return AsyncStorage.getItem('items').then((response) => {
    if (response) return Promise.resolve(JSON.parse(response));
    else return Promise.resolve([]);
  });
}


async function deleteItem(id) {
  let savedItems = await getItems();
  const index = await savedItems.findIndex((item) => item.id === id);
  savedItems.splice(index, 1);
  return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

module.exports = {
  saveItem,
  getItems,
  deleteItem,
};
