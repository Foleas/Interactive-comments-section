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
  const scoreWrapper =
    "bg-gray-light rounded-md flex-[0_0_40px] h-[100px] flex flex-col flex-wrap";
  const scoreWrapperSM =
    "max-sm:flex-row max-sm:h-[40px] max-sm:w-[100px] max-sm:flex-[0_0_100px]";

  const scoreWrapperXS = "max-xs:flex-auto";

  const scoreButton = "fill-blue-lightGrayish flex-1";
  const scoreButtonSM = "";

  const scoreText =
    "font-bold text-blue-moderate flex-1 flex justify-center items-center";

  return (
    <div
      className={`score ${scoreWrapper} ${scoreWrapperSM} ${scoreWrapperXS}`}
    >
      <button
        className={`${scoreButton} ${scoreButtonSM} ${
          scoreAction === "up"
            ? "cursor-not-allowed"
            : "hover:fill-blue-moderate"
        }`}
        disabled={scoreAction === "up"}
        onClick={upHandler}
      >
        <IconPlus className="ml-auto mr-auto transition-[fill]" />
      </button>
      <p className={`${scoreText}`}>{score}</p>
      <button
        className={`${scoreButton} ${scoreButtonSM} ${
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
