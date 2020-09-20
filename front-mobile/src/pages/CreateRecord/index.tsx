import React, { useEffect, useState } from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { Game, GamePlatform } from './types';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const BASE_URL = 'https://games-survey-dev-sup.herokuapp.com';

const mapSelectValues = (games: Game[]) => {
  return games.map((game) => ({
    ...game,
    label: game.title,
    value: game.id,
  }));
};

const CreateRecord: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const handleChangePlatform = (selectedPlatform: GamePlatform) => {
    setPlatform(selectedPlatform);
    const gamesByPlatform = allGames.filter(
      (game) => game.platform === selectedPlatform
    );
    setFilteredGames(gamesByPlatform);
  };

  const handleSubmit = () => {
    const payload = { name, age, gameId: selectedGame };

    axios
      .post(`${BASE_URL}/records`, payload)
      .then(() => {
        Alert.alert('Dados salvos com sucesso!');
        setName('');
        setAge('');
        setSelectedGame('');
        setPlatform(undefined);
      })
      .catch(() => {
        Alert.alert('Erro ao salvar informações!');
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/games`)
      .then((response) => {
        const selectValues = mapSelectValues(response.data);
        setAllGames(selectValues);
      })
      .catch(() => {
        Alert.alert('Erro ao listar os jogos!');
      });
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder="Nome"
          placeholderTextColor="#9E9E9E"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Idade"
          placeholderTextColor="#9E9E9E"
          keyboardType="number-pad"
          maxLength={3}
          onChangeText={setAge}
          value={age}
        />
        <View style={styles.platformContainer}>
          <PlatformCard
            activePlatform={platform}
            platform="PC"
            icon="laptop"
            onChange={handleChangePlatform}
          />
          <PlatformCard
            platform="PLAYSTATION"
            activePlatform={platform}
            icon="playstation"
            onChange={handleChangePlatform}
          />
          <PlatformCard
            activePlatform={platform}
            platform="XBOX"
            icon="xbox"
            onChange={handleChangePlatform}
          />
        </View>
        <RNPickerSelect
          onValueChange={setSelectedGame}
          placeholder={{
            label: 'Selecione o game',
          }}
          value={selectedGame}
          items={filteredGames}
          style={pickerSelectStyles}
          Icon={() => <Icon name="chevron-down" color="#9E9E9E" size={25} />}
        />
        <View style={styles.footer}>
          <RectButton onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#FF769D',
    paddingRight: 30,
    fontFamily: 'Play_700Bold',
    height: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#FF769D',
    paddingRight: 30,
    fontFamily: 'Play_700Bold',
    height: 50,
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: 'Play_700Bold',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50,
  },
  inputText: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#FF769D',
    fontFamily: 'Play_700Bold',
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21,
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Play_700Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  },
});

export default CreateRecord;
