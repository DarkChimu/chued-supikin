/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-namespace */
import ClickType from "./click-type";
import NoteValue from "./note-value";

namespace MetronomeConfig {
  export interface Config {
    beatCount: number;
    tempo: number;
    noteValue: NoteValue;
    clickType: ClickType;
    enableClickSound: boolean;
    currBeat: number;
  }

  export const MIN_TEMPO = 40;
  export const MAX_TEMPO = 220;
  export const MIN_BEAT_COUNT = 1;
  export const MAX_BEAT_COUNT = 7;

  export interface Action {
    type:
      | "setTempo"
      | "setBeatCount"
      | "setNoteValue"
      | "setClickType"
      | "setEnableClickSound";
    data: Partial<Config>;
  }

  export function reducer(state: Config, action: Action) {
    const newState = { ...state };

    switch (action.type) {
      case "setTempo":
        let newTempo = action.data.tempo;
        if (newTempo === undefined) return state;

        newTempo = Math.min(newTempo, MAX_TEMPO);
        newTempo = Math.max(newTempo, MIN_TEMPO);
        newState.tempo = newTempo;
        break;

      case "setBeatCount":
        let beatCount = action.data.beatCount;
        if (beatCount === undefined) return state;

        beatCount = Math.min(beatCount, MAX_BEAT_COUNT);
        beatCount = Math.max(beatCount, MIN_BEAT_COUNT);
        newState.beatCount = beatCount;
        break;

      case "setNoteValue":
        if (action.data.noteValue === undefined) return state;

        newState.noteValue = action.data.noteValue;
        break;

      case "setClickType":
        if (action.data.clickType === undefined) return state;

        newState.clickType = action.data.clickType;
        break;

      case "setEnableClickSound":
        if (action.data.enableClickSound === undefined) return state;
        newState.enableClickSound = action.data.enableClickSound;
        break;

      default:
        return state;
    }

    return newState;
  }
}

export default MetronomeConfig;
