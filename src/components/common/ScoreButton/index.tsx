import { ReactComponent as IconPlus } from "../../../assets/icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../../assets/icons/icon-minus.svg";
import { ScoreAction } from "../../../types";

interface ScoreButtonProps {
  score: number;
  scoreAction: ScoreAction;
  upHandler: () => void;
  downHandler: () => void;
}
const ScoreButton = ({
  score,
  scoreAction,
  upHandler,
  downHandler,
}: ScoreButtonProps) => {
  const scoreButtonClass = "w-full h-[40px] fill-blue-lightGrayish ";

  return (
    <div className="score flex-[0_0_40px] bg-gray-light rounded-md">
      <button
        className={`${scoreButtonClass} ${
          scoreAction === "up"
            ? "cursor-not-allowed"
            : "hover:fill-blue-moderate"
        }`}
        disabled={scoreAction === "up"}
        onClick={upHandler}
      >
        <IconPlus className="ml-auto mr-auto transition-[fill]" />
      </button>
      <p className="font-bold text-blue-moderate text-center">{score}</p>
      <button
        className={`${scoreButtonClass} ${
          scoreAction === "down"
            ? "cursor-not-allowed"
            : "hover:fill-blue-moderate"
        }`}
        disabled={scoreAction === "down"}
        onClick={downHandler}
      >
        <IconMinus className="ml-auto mr-auto transition-[fill]" />
      </button>
    </div>
  );
};

export default ScoreButton;
