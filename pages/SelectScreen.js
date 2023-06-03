import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [zones, setZones] = useState([]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedZone(null);
  };

  useEffect(() => {
    fetch('https://9e20-105-158-235-213.eu.ngrok.io/api/villes/all')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetch(`https://9e20-105-158-235-213.eu.ngrok.io/api/villes/${selectedCity}/zones`)
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.log(error));
    } else {
      setZones([]);
    }
  }, [selectedCity]);

  const handleSearchPress = () => {
    navigation.navigate('SecondScreen', {
      selectedCity: selectedCity,
      selectedZone: selectedZone,
    });
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Restaurant</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>choisissez une ville </Text>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => handleCityChange(itemValue)}
        >
          <Picker.Item label="None" value={null} />
          {cities.map(city => (
            <Picker.Item key={city.id} label={city.nom} value={city.nom} />
          ))}
        </Picker>
      </View>

      {/* Conditionally render the zone select and button */}
      {selectedCity && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>choisissez une zone </Text>
          <Picker
            selectedValue={selectedZone}
            onValueChange={(itemValue) => setSelectedZone(itemValue)}
            enabled={selectedCity !== null}
          >
            <Picker.Item label="None" value={null} />
            {zones.map(zone => (
              <Picker.Item key={zone.id} label={zone.nom} value={zone.nom} />
            ))}
          </Picker>
        </View>
      )}

      {/* Conditionally render the search button */}
      {selectedCity && selectedZone && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSearchPress}>
          <Text style={styles.button}>Chercher</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0286FF',
  },
  pickerContainer: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#19f5aa',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    color: 'white',
    fontSize: 18,
    color: 'black',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: '#19f5aa',
  },
});

export default SelectScreen;
