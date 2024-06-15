import { ChangeEvent } from "react";

interface Props {
  clickSound: boolean;
  onClickSoundChanged: (valie: boolean) => void;
}

export default function EnableClickSound({
  clickSound,
  onClickSoundChanged,
}: Props) {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onClickSoundChanged(event.target.checked ? true : false);
  };

  return (
    <div className="flex flex-col items-center">
      {/*  <p>Tipo de click</p> */}

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          className="accent-amber-500"
          checked={clickSound === true}
          onChange={changeHandler}
        />
        <span className="text-lg">Habilitar Sonido</span>
      </label>
      {/* <span>(Podría afectar la presición en algunos navegadores)</span> */}
    </div>
  );
}
