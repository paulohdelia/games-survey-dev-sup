import React from 'react';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { GamePlatform } from './types';

type Props = {
  platform: GamePlatform;
  onChange: (platform: GamePlatform) => void;
  icon: string;
  activePlatform?: GamePlatform;
};

const PlatformCard = ({ platform, onChange, icon, activePlatform }: Props) => {
  const isActive = platform === activePlatform;
  const backgroundColor = isActive ? '#FF769D' : '#FFF';
  const textColor = isActive ? '#00D4FF' : '#FF769D';

  return (
    <RectButton
      style={[styles.platformCard, { backgroundColor }]}
      onPress={() => onChange(platform)}
    >
      <Icon name={icon} size={60} color={textColor} />
      <Text style={[styles.platformCardText, { color: textColor }]}>
        {platform === 'PLAYSTATION' ? 'PS' : platform}
      </Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  platformCard: {
    paddingTop: 30,
    paddingBottom: 20,
    width: '30%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformCardText: {
    marginTop: 40,
    fontSize: 24,
    fontFamily: 'Play_700Bold',
    textAlign: 'center',
  },
});

export default PlatformCard;
