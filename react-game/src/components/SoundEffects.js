import React, {useEffect, useRef} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import popCatSound from '../assets/pop_cat.mp3';
import onLoseSound from '../assets/Wilhelm_Scream.mp3';
import winS from '../assets/b146dc8d75d05f3.mp3';
import rCSound from '../assets/ffc89ff250028f8.mp3';
import music1 from '../assets/brought-to-you-by-a-falling-bob-omb-by-0x10.mp3';

const openSound = new Audio(popCatSound);
const flagSound = new Audio(rCSound);
const loseSound = new Audio(onLoseSound);
const winSound = new Audio(winS);
let song1 = new Audio(music1);

const SoundEffects = () => {
  const state = useSelector(storeState => ({
    win: storeState.board.win,
    bang: storeState.board.bang,
    flags: storeState.board.field.flags.length,
    opened: storeState.board.field.opened.length,
    soundVolume: storeState.settings.audioVolume.sound,
    musicVolume: storeState.settings.audioVolume.music,
  }), shallowEqual);

  const stateRef = useRef(); // a smart way to capture the previous state of a selector
  const prevState = stateRef.current || state
  useEffect(() => stateRef.current = state);

  // sound effects
  const playWin = state.win && !prevState.win;
  const playBang = state.bang && !prevState.bang;
  const playOpen = state.opened !== prevState.opened;
  const playFlag = state.flags !== prevState.flags;
  const playSample = state.soundVolume !== prevState.soundVolume;

  const playSound = (sound) => {
    sound.volume = state.soundVolume;
    sound.start = 0;
    sound.play();
  }
  playWin && playSound(winSound);
  playBang && playSound(loseSound);
  playFlag && playSound(flagSound);
  playOpen && playSound(openSound);
  playSample && playSound(openSound);

  useEffect(() => {
    song1.volume = state.musicVolume;
    song1.loop = true;
    if (state.musicVolume) {
      song1.play().catch(() => {
        console.error('Failed to play music. Will try again next time')
        // This will trigger the same effect on the next render which is likely caused by some user interaction.
        song1 = new Audio(music1);
      });
    }
    return () => song1.pause();
  }, [song1, state.musicVolume])

  return <></>
};

export default SoundEffects;
