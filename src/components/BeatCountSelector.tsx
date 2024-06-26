import IncDec from "./IncDec";

interface Props {
  beatCount: number;
  onBeatCountChanged: (beatCount: number) => void;
}

export default function BeatCountSelector({
  beatCount,
  onBeatCountChanged,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <p>Numbero de Beats</p>

      <IncDec
        label={"" + beatCount}
        onInc={() => onBeatCountChanged(beatCount + 1)}
        onDec={() => onBeatCountChanged(beatCount - 1)}
      />
    </div>
  );
}
