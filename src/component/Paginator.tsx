import generatePageButtons from "../utils/generatePageButtons";

export default function Paginator(
  { total, current, pageSize, onPageClick }:
    { total: number, current: number, pageSize: number, onPageClick: (page: number) => void }
) {

  const desktopButtons = generatePageButtons(total, current, pageSize, 10)
  const mobileButtons = generatePageButtons(total, current, pageSize, 3)

  return (
    <nav>
      <ul className="inline-flex items-center -space-x-px max-sm:hidden">
        {
          desktopButtons.map(
            (button) => <li key={button.label}>
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

      <ul className="inline-flex items-center -space-x-px sm:hidden">
        {
          mobileButtons.map(
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
    </nav>
  );
} 