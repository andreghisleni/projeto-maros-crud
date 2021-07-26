import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Database from './Database';

export default function AppForm({ route, navigation }) {

  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    setId('');
    setDescricao('');
    setQuantidade('');

    console.log(route.params?.id)

    if (!route.params) { return; }

    (async () => {
      setId(route.params.id);

      const items = await Database.getItems();

      const item = items.find(({ id: i }) => i === route.params.id);

      setDescricao(item.descricao);
      setQuantidade(item.quantidade.toString());
    })()
  }, [route]);

  function handleDescriptionChange(descricao) {
    setDescricao(descricao);
  }
  function handleQuantityChange(quantidade) {
    setQuantidade(quantidade);
  }

  async function handleButtonPress() {
    const listItem = { descricao, quantidade: parseInt(quantidade) };
    console.log(id);
    Database.saveItem(listItem, id).then((response) => {

      navigation.reset({
        index: 0,
        routes: [{ name: 'AppList', params: { listItem } }],
      });
    });
  }

  async function handleCancelPress() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppList' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item para comprar</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleDescriptionChange}
          placeholder="O que está faltando em casa?"
          clearButtonMode="always"
          value={descricao}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleQuantityChange}
          placeholder="Digite a quantidade"
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={quantidade.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: '#D93600', }} onPress={handleCancelPress}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
  },
  button: {
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
