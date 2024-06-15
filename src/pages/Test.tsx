import BeatCountSelector from "@/components/BeatCountSelector";
import ClickTypeSelector from "@/components/ClickTypeSelector";
import Metronome from "@/components/Metronome";
import NoteSelector from "@/components/NoteSelector";
import PlayStopButton from "@/components/PlayStopButton";
import TempoSelector from "@/components/TempoSelector";
import ClickType from "@/types/click-type";
import MetronomeConfig from "@/types/metronome-config";
import NoteValue from "@/types/note-value";
import { useReducer, useState, useRef, useEffect } from "react";
import { TECHNIQUES } from "@/types/techniques-list";

export default function Test() {
  const [isPlaying, setIsPlaying] = useState(false);

  const lapCount = useRef(0);
  const [currentTechnique, setCurrentTechnique] = useState(TECHNIQUES[0]);
  const [config, dispatch] = useReducer(MetronomeConfig.reducer, {
    beatCount: 4,
    tempo: 100,
    noteValue: NoteValue.CROTCHET,
    clickType: ClickType.SYNTHETIC,
    currBeat: 0,
  });


  useEffect(()=> {
    lapCount.current = 0;
  }, [isPlaying])

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onCurrBeatCallback = (curr: number): number => {
    if (curr === 0) {
      console.log("Lap: ", lapCount.current);
      lapCount.current++;
    }

    if (lapCount.current === 8) {
      setCurrentTechnique(
        TECHNIQUES[getRandomIntInclusive(1, TECHNIQUES.length)]
      );
      lapCount.current = 0;
    }

    return curr;
  };

  return (
    <div className="mt-2 flex flex-col items-center">
      <Metronome
        config={config}
        isPlaying={isPlaying}
        currBeatCallback={onCurrBeatCallback}
      />

      <div className="mt-2 mb-4">
        <h2 className="text-3xl">{currentTechnique}</h2>
      </div>

      <PlayStopButton onPlayStopChanged={setIsPlaying} />

      <div className="flex flex-col gap-5 items-center mt-5">
        {/* Selectors for metronome configuration */}
        <NoteSelector
          onNoteChanged={(noteValue) =>
            dispatch({ type: "setNoteValue", data: { noteValue } })
          }
          noteValue={config.noteValue}
        />
        <TempoSelector
          onTempoChanged={(tempo) =>
            dispatch({ type: "setTempo", data: { tempo } })
          }
          tempo={config.tempo}
        />
        <BeatCountSelector
          onBeatCountChanged={(beatCount) =>
            dispatch({ type: "setBeatCount", data: { beatCount } })
          }
          beatCount={config.beatCount}
        />
        <ClickTypeSelector
          onClickTypeChanged={(clickType) =>
            dispatch({ type: "setClickType", data: { clickType } })
          }
          clickType={config.clickType}
        />
      </div>
    </div>
  );
}
