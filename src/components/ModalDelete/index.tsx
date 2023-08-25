interface ModalDeleteProps {
  onCancel: () => void;
  onConfirm?: () => void;
}
const ModalDelete = ({ onCancel, onConfirm }: ModalDeleteProps) => {
  const buttonClass =
    "flex-1 text-white uppercase py-2 font-medium rounded-md transition-colors";

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-8 overflow-x-hidden overflow-y-auto min-h-screen max-h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
    >
      <div className="relative bg-white p-8 w-96 rounded-lg shadow dark:bg-gray-700">
        <div className="relative ">
          <div className="flex items-start justify-between rounded-t dark:border-gray-600">
            <h3 className="text-[24px] font-medium text-blue-dark">
              Delete Comment
            </h3>
          </div>

          <div className="py-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`${buttonClass} bg-blue-grayish hover:bg-blue-lightGrayish`}
              onClick={onCancel}
            >
              No, Cancel
            </button>
            <button
              type="button"
              className={`${buttonClass} bg-red-soft hover:bg-red-pale`}
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
