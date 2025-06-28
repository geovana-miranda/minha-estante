interface IButtonsModalProps {
  handleToggleModal: () => void;
  handleSubmit: () => void;
}

const ButtonsModal = ({
  handleToggleModal,
  handleSubmit,
}: IButtonsModalProps) => {
  return (
    <div className="flex items-center gap-5">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleModal();
        }}
        className="w-full py-2 border border-gray-600 text-gray-700  rounded-3xl font-bold cursor-pointer hover:bg-gray-200 hover:text-gray-700 transition-colors"
      >
        Cancelar
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSubmit();
        }}
        className="w-full py-2 border rounded-3xl font-bold cursor-pointer bg-blue-800 hover:bg-blue-600 text-white"
      >
        Salvar
      </button>
    </div>
  );
};

export default ButtonsModal;
