import generatePageButtons from "../utils/generatePageButtons";

export default function Paginator({ total, current, pageSize, onPageClick }: { total: number, current: number, pageSize: number, onPageClick: (page: number) => void }) {
  return (
    <nav >
      <ul className="inline-flex items-center -space-x-px">
        {
          generatePageButtons(total, current, pageSize).map(
            (button) => <li key={button.page}>
              <button
                onClick={() => {
                  onPageClick(button.page);
                }}
                className={`
                  px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                  ${button.page === current ? 'bg-gray-200 text-gray-700 font-bold' : ''}
                `}
              >
                {button.label}
              </button>
            </li>
          )
        }
      </ul>
    </nav >
  );
} 